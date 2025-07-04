export class PaymentRequestHelper {
  constructor(details) {
    this.details = details;
    this.initialize();
  }

  getDetails() {
    return this.details;
  }
  
  initialize() {
    this.details.error = '';
    this.details.shippingAddressErrors = {};
    this.details.paymentMethodErrors = {};
  }

  removeItem(label) {
    let total = 0;
    for (let i = 0; i < this.details.displayItems.length; i++) {
      let item = this.details.displayItems[i];
      if (label == item.label) {
        this.details.displayItems.splice(i--, 1);
        // Remove all items with the same label
      } else {
        total += parseFloat(item.amount.value);
      }
    }
    this.details.total.amount.value = total.toString();
  }

  appendItem(item) {
    let total = 0;
    this.details.displayItems.push(item);
    for (let item of this.details.displayItems) {
     total += parseFloat(item.amount.value);
    }
    this.details.total.amount.value = total.toString();
  }

  selectShippingOption(id) {
    this.initialize();
    const oldShippingOption = this.details.shippingOptions.find(option => {
      return option.selected;
    });    
    const newShippingOption = this.details.shippingOptions.find(option => {
      return option.id === id;
    });

    // If `newShippingOption` is not assigned, no changes.
    if (!newShippingOption) {
      this.appendShippingError('Shipping option is not available.');
      return;
    }

    if (oldShippingOption) {
      oldShippingOption.selected = false;
      this.removeItem(oldShippingOption.label);
    }
    newShippingOption.selected = true;
    this.appendItem(newShippingOption); // `id` should be removed
  }

  appendShippingError(error, shippingAddressErrors = {}, paymentMethodErrors = {}) {
    this.details.error = error;
    this.shippingAddressErrors = shippingAddressErrors; // TODO: Should we validate properties?
    this.paymentMethodErrors = paymentMethodErrors; // TODO: Should we validate properties?
    this.shippingOptions = [];
  }
};

export const requestPayment = async (methods, details, options) => {
  const request = new PaymentRequest(methods, details, options);
  request.addEventListener('paymentmethodchange', e => {
    const helper = new PaymentRequestHelper(details);
    if (e.methodName.indexOf('another-pay') > 0) {
      const discountItem = {
        label: 'special discount',
        amount: {
          currency: 'USD',
          value: '-10.00'
        }
      }
      helper.appendItem(discountItem);
    } else {
      helper.removeItem('special discount');
    }
    e.updateWith(helper.getDetails());
  });
  request.addEventListener('shippingaddresschange', e => {
    const helper = new PaymentRequestHelper(details);
    // e.updateWith(Promise.resolve(details));
    const country = request.shippingAddress.country;
    if (country == 'US') {
      // How do we restrict the option when the customer selects international?
      helper.selectShippingOption('standard');
    } else if (country == 'JP') {
      helper.selectShippingOption('international');
    } else {
      helper.appendShippingError(`Unable to ship the item to your country.`, {
        'country': `${country} is not a shippable country.`
      });
    }
    e.updateWith(helper.getDetails());
  });
  request.addEventListener('shippingoptionchange', e => {
    const helper = new PaymentRequestHelper(details);
    helper.selectShippingOption(request.shippingOption);
    // e.updateWith(Promise.resolve(details));
    e.updateWith(helper.getDetails());
  });
  try {
    const result = await request.show();
    if (result === null) {
      return result.complete(null);
    } else {
      return new Promise(resolve => {
        setTimeout(e => {
          result.complete('success');
          resolve(result);
        }, 2000);
      });
    }
  } catch (e) {
    if (e.name == 'AbortError') {
      return Promise.resolve(null);
    } else {
      return Promise.reject(e);
    }
  }
};

const snackbar = document.querySelector('#snackbar');
export const toast = text => {
  snackbar.labelText = text;
  snackbar.show();
}
