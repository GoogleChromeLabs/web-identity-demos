import { html, render } from 'https://unpkg.com/lit-html?module';

const container = document.querySelector('#container');
const payBtn = document.querySelector('#pay');
const cancelBtn = document.querySelector('#cancel');

const postMessage = (type, contents = {}) => {
  if (navigator.serviceWorker?.controller) {
    navigator.serviceWorker.controller.postMessage({ type, ...contents });
  }
}

let paymentOptions;
let total;
let shippingOptions;
let shippingAddresses;
let paymentInstruments;
let contacts;
let error;
let paymentMethodErrors;
let shippingAddressErrors;

if (navigator.serviceWorker) {
  navigator.serviceWorker.addEventListener('message', e => {
    switch (e.data.type) {
      case 'PAYMENT_IS_READY':
        ({ total, paymentOptions, shippingOptions } = e.data);
        // Update the UI
        renderHTML(total, paymentOptions, shippingOptions);
        break;
      case 'UPDATE_REQUEST':
        ({
          error,
          total,
          shippingOptions,
          paymentMethodErrors,
          shippingAddressErrors,
        } = e.data);
        renderHTML(total, paymentOptions, shippingOptions, error);
        break;
      default:
        break;
    }
  });  
}

document.addEventListener('DOMContentLoaded', async e => {
  const [ instruments, addresses, _contacts ] = await Promise.all([
    fetch('/user/payment-instruments'),
    fetch('/user/shipping-addresses'),
    fetch('/user/contacts'),
  ]);
  [ paymentInstruments, shippingAddresses, contacts ] = await Promise.all([
    instruments.json(),
    addresses.json(),
    _contacts.json(),
  ]);
  postMessage('WINDOW_IS_READY');
});

const renderHTML = (total = {}, options = paymentOptions, shippingOptions = [], error = '') => {
  return render(html`
    <h2>${total.value} ${total.currency}</h2>
    ${error ? html`<div style="color:red;">${error}</div>` : ''}
    <div>
      <label for="payment-instrument">Payment Instrument:</label>
      <select id="payment-instrument" @change="${changePaymentMethod}">
        ${paymentInstruments.map(instrument => html`
        <option value="${instrument.id}">${instrument.label}</option>
        `)}
      </select>
    </div>
    ${options?.requestShipping ? html`
    <div>
      <label for="shipping-option">Shipping Option</label>
      <select id="shipping-option" @change="${changeShippingOption}">
        ${shippingOptions.map(option => html`
        <option value="${option.id}">${option.label}</option>
        `)}
      </select>
    </div>
    <div>
      <label for="shipping-address">Shipping Address</label>
      <select id="shipping-address" @change="${changeShippingAddress}">
        ${shippingAddresses.map(address => html`
        <option value="${address.id}">${address.label}</option>
        `)}
      </select>
    </div>`:''}
    <button @click="${onPay}">Pay</button>
    <button @click="${onCancel}">Cancel</button>`, container);
}

const changePaymentMethod = e => {
  const instrument = paymentInstruments.find(instrument => instrument.id == e.target.value);
  postMessage('PAYMENT_METHOD_CHANGED', {
    paymentMethod: instrument.paymentMethod,
    methodDetails: instrument.methodDetails,
  });
};

const changeShippingOption = e => {
  postMessage('SHIPPING_OPTION_CHANGED', {
    shippingOptionId: e.target.value
  });
};

const changeShippingAddress = e => {
  const address = shippingAddresses.find(address => address.id == e.target.value);
  postMessage('SHIPPING_ADDRESS_CHANGED', {
    shippingAddress: address
  });
};

const onPay = e => {
  const piId = document.querySelector('#payment-instrument').value;
  const instrument = paymentInstruments.find(instrument => instrument.id == piId);
  const paymentMethod = instrument.paymentMethod;

  let shippingOptionId, shippingAddress;
  if (paymentOptions.requestShipping) {
    shippingOptionId = document.querySelector('#shipping-option').value;
    const addressId = document.querySelector('#shipping-address').value;
    shippingAddress = shippingAddresses.find(address => address.id == addressId);
  }

  postMessage('PAYMENT_AUTHORIZED', {
    paymentMethod,              // Payment method identifier
    shippingOptionId,           // Shipping option id
    shippingAddress,            // shipping address object
    payerName: contacts.name,   // Payer name
    payerPhone: contacts.phone, // Payer Phone
    payerEmail: contacts.email, // Payer Email
  });
};

const onCancel = e => postMessage('CANCEL_PAYMENT');