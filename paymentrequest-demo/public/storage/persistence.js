import { INIT } from './actions.js';

const savePaymentRequest = paymentRequest => {
  window.localStorage.setItem('paymentRequest', JSON.stringify(paymentRequest));
}

const loadPaymentRequest = () => {
  let pr = window.localStorage.getItem('paymentRequest');
  return pr ? JSON.parse(pr) : null;
}

export const persistence = store => next => action => {
  let result = next(action)
  if (action.type === INIT) {
    store.getState().request = loadPaymentRequest();
    store.getState().result = 'Press a "Pay" button.';
  } else {
    savePaymentRequest(store.getState().request);
  }
  return result;
}
