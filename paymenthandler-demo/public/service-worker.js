const origin = location.origin;

class PromiseResolver {
  constructor() {
    this.promise_ = new Promise((resolve, reject) => {
      this.resolve_ = resolve;
      this.reject_ = reject;
    })
  }
  get promise() { return this.promise_ } 
  get resolve() { return this.resolve_ }
  get reject() { return this.reject_ }
}

let payment_request_event;
let resolver;
let client;

// `self` is the global object in service worker
self.addEventListener('paymentrequest', async e => {
  if (payment_request_event) {
    // If there's an ongoing payment transaction, reject it
    resolver.reject();
  }

  // Preserve the event for future use.
  payment_request_event = e;

  // Retain a promise for future resolution
  // Polyfill for PromiseResolver is provided below.
  resolver = new PromiseResolver();

  // Pass a promise that resolves when payment is done.
  e.respondWith(resolver.promise);
  // Open the checkout page.
  try {
    // Open the window and preserve the client
    client = await e.openWindow('/pay');
    if (!client) {
      // Reject if the window fails to open
      throw 'Failed to open window.';
    }
  } catch (error) {
    // Reject the promise on failure
    resolver.reject(error);
  }
});

// Define a convenient `postMessage()` method
const postMessage = (type, contents = {}) => {
  if (client) client.postMessage({ type, ...contents });
}

// Received a message from the frontend
self.addEventListener('message', async e => {
  let details;
  try {
    switch (e.data.type) {
      // `WINDOW_IS_READY` is a frontend's ready state signal
      case 'WINDOW_IS_READY':
        const { total, paymentOptions, shippingOptions } = payment_request_event;
        // Pass the payment details to the frontend
        postMessage('PAYMENT_IS_READY', {
          total, paymentOptions, shippingOptions
        });
        break;
      case 'PAYMENT_METHOD_CHANGED': {
        const newMethod = e.data.paymentMethod;
        const newDetails = e.data.methodDetails;
        details = await payment_request_event.changePaymentMethod(newMethod, newDetails);
        postMessage('UPDATE_REQUEST', details);
        break;
      }
      case 'SHIPPING_ADDRESS_CHANGED':
        const newAddress = e.data.shippingAddress;
        details = await payment_request_event.changeShippingAddress(newAddress);
        postMessage('UPDATE_REQUEST', details);
        break;
      case 'SHIPPING_OPTION_CHANGED':
        const newOption = e.data.shippingOptionId;
        details = await payment_request_event.changeShippingOption(newOption);
        postMessage('UPDATE_REQUEST', details);
        break;
      case 'PAYMENT_AUTHORIZED': {
        // Resolve the payment request event promise
        // with a payment response object
        const response = {
          methodName: e.data.paymentMethod,
          details: { id: 'payment credential comes here' },
        }
        let { paymentOptions } = payment_request_event;
        if (paymentOptions.requestBillingAddress) {
          response.details.billingAddress = e.data.methodData.billingAddress;
        }
        if (paymentOptions.requestShipping) {
          response.shippingAddress = e.data.shippingAddress;
          response.shippingOption = e.data.shippingOptionId;
        }
        if (paymentOptions.requestPayerEmail) {
          response.payerEmail = e.data.payerEmail;
        }
        if (paymentOptions.requestPayerName) {
          response.payerName = e.data.payerName;
        }
        if (paymentOptions.requestPayerPhone) {
          response.payerPhone = e.data.payerPhone;
        }
        resolver.resolve(response);
        // Don't forget to initialize.
        payment_request_event = null;
        break;
      }
      case 'CANCEL_PAYMENT':
        // Resolve the payment request event promise
        // with null
        resolver.resolve(null);
        // Don't forget to initialize.
        payment_request_event = null;
        break;
    }
  } catch (error) {
    resolver.reject();
    payment_request_event = null;
  }
});
