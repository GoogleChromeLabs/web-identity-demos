import { render } from 'https://unpkg.com/lit-html?module';
import { PaymentMethods } from './components/payment-methods.js';
import { DisplayItems } from './components/display-items.js';
import { Total } from './components/total.js';
import { Options } from './components/options.js';
import { Result } from './components/result.js';
import { store } from './storage/store.js';
import {
  init,
  initPaymentMethods,
  initTotal,
  initDisplayItems,
  initShippingOptions,
  initOptions
} from './storage/actions.js';

store.dispatch(init());

if (store.getState().request === null) {
  store.getState().request = [];
  store.dispatch(initPaymentMethods());
  store.dispatch(initTotal());
  store.dispatch(initDisplayItems());
  store.dispatch(initShippingOptions());
  store.dispatch(initOptions());
}

const renderApp = () => {
  const paymentRequest = store.getState().request;
  const result = store.getState().result;
  render(PaymentMethods(paymentRequest.paymentMethods),
    document.querySelector('#payment-methods-container'));
  render(DisplayItems(paymentRequest.details.displayItems),
    document.querySelector('#display-items-container'));
  render(Total(paymentRequest.details.total),
    document.querySelector('#total-container'));
  render(Options(paymentRequest),
    document.querySelector('#options-container'));
  render(Result(result),
    document.querySelector('#payment-request-result-container'));
}

const url = new URL(document.location.href);
if (url.searchParams.has('error')) {
  toast('There was an error');
}

store.subscribe(renderApp);

renderApp();
