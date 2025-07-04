import { html } from 'https://unpkg.com/lit-html?module';
import {
  initPaymentMethods,
  addPaymentMethod,
  editSupportedMethods,
  editPaymentMethodData,
  removePaymentMethod,
  showResult
} from '../storage/actions.js';
import { store } from '../storage/store.js';
import { toast, requestPayment } from '../common.js';

const init = () => {
  if (confirm(`Payment buttons will be initialized.
Are you sure you want to proceed?`)) {
    store.dispatch(initPaymentMethods());
  }
}

const add = () => {
  store.dispatch(addPaymentMethod());
};

const editIdentifier = e => {
  const index = parseInt(e.target.dataset.index);
  const supportedMethods = e.target.value;
  store.dispatch(editSupportedMethods(index, supportedMethods));
};

const editData = e => {
  let parsed;
  const index = parseInt(e.target.dataset.index);
  const data = e.target.value;
  try {
    JSON.parse(data);
    store.dispatch(editPaymentMethodData(index, data));
  } catch (e) {
    toast('Specify payment method data in JSON format.');
  }
};

const remove = e => {
  const index = parseInt(e.target.dataset.index);
  if (confirm('Are you sure you want to remove this payment method?')) {
    store.dispatch(removePaymentMethod(index));
  }
}

const pay = async e => {
  const paymentMethod = e.target.dataset['paymentMethod'];
  const request = store.getState().request;
  const method = request.paymentMethods.find(method => {
    return method.supportedMethods == paymentMethod;
  });
  let data, supportedMethods;
  try {
    supportedMethods = method.supportedMethods;
    method.data = method.data === '' ? '{}' : method.data;
    data = JSON.parse(method.data);
  } catch (e) {
    toast(e);
  }

  requestPayment(
    [{ supportedMethods, data }],
    request.details,
    request.options
  ).then(result => {
    // Ignore if `null` is returned
    if (result === null) return;
    toast('success');
    const _result = JSON.stringify(result, null, 2);
    store.dispatch(showResult(_result));      
  }).catch(error => {
    toast(error);
  });
};

export const PaymentMethods = (paymentMethods) => {
  return html`
    <div class="form-area">
      <div class="mdc-layout-grid__inner">
        ${paymentMethods.map((paymentMethod, i) => html`
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <mwc-textfield
            label="Payment Method Identidier"
            size="30"
            data-index="${i}"
            @change="${editIdentifier}"
            value="${paymentMethod.supportedMethods}"
            outlined></mwc-textfield>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
          <mwc-textarea
            label="Data"
            helper="Write in JSON format"
            cols="60"
            data-index="${i}"
            @change="${editData}"
            value="${paymentMethod.data}"
            outlined></mwc-textarea>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <mwc-button
            icon="account_balance_wallet"
            data-payment-method="${paymentMethod.supportedMethods}"
            @click="${pay}"
            style="--mdc-theme-primary: #33AA33; width: 100%;"
            raised>Pay</mwc-button>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-1">
          <mwc-icon-button
            icon="delete_forever"
            data-index="${i}"
            @click="${remove}"></mwc-icon-button>
        </div>`)}
      </div>
    </div>

    <mwc-button @click="${add}" raised>Add a payment button</mwc-button>
    <mwc-button @click="${init}">Initialize payment buttons</mwc-button>`;
}