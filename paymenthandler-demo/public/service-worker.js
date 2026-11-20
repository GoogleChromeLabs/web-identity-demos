const origin = location.origin;
const activeRequests = new Map();

// In a real payment app, check whether the user has a saved account or payment
// instrument (for example, in IndexedDB or via an authenticated endpoint). If
// your app always returns true, omit the 'canmakepayment' listener instead.
async function hasSavedPaymentInstrument() {
  return true;
}

self.addEventListener('canmakepayment', e => {
  e.respondWith(hasSavedPaymentInstrument());
});

// `self` is the global object in service worker
self.addEventListener('paymentrequest', async e => {
  // Track each request by ID so concurrent payment requests don't collide
  // and stale messages from earlier windows are ignored.
  const id = crypto.randomUUID();
  const { promise, resolve, reject } = Promise.withResolvers();
  activeRequests.set(id, { event: e, resolve, reject });

  // Pass a promise that resolves when payment is done.
  e.respondWith(promise);

  // Open the checkout page with the request ID in the query string.
  try {
    const client = await e.openWindow(`/pay?id=${id}`);
    if (!client) {
      throw new DOMException('Failed to open window.', 'AbortError');
    }
  } catch (error) {
    activeRequests.delete(id);
    reject(error);
  }
});

// Define a convenient `postMessage()` method
const postMessage = (type, contents = {}, target) => {
  if (target) target.postMessage({ type, ...contents });
}

// Forward a change event to the merchant and relay any updated details back to
// the payment window. Only one change call can be in flight per request;
// overlapping calls reject with InvalidStateError.
async function notifyMerchantChange(target, runChange) {
  try {
    const details = await runChange();
    if (details) {
      postMessage('UPDATE_REQUEST', details, target);
    }
  } catch (error) {
    if (error.name === 'InvalidStateError') {
      return;
    }
    throw error;
  }
}

// Received a message from the frontend
self.addEventListener('message', async e => {
  const id = e.data?.id;
  const request = activeRequests.get(id);
  if (!request) return;

  const { event: paymentRequestEvent, resolve, reject } = request;
  try {
    switch (e.data.type) {
      // `WINDOW_IS_READY` is a frontend's ready state signal
      case 'WINDOW_IS_READY': {
        const { total, paymentOptions, shippingOptions } = paymentRequestEvent;
        // Pass the payment details to the frontend
        postMessage('PAYMENT_IS_READY', {
          total, paymentOptions, shippingOptions
        }, e.source);
        break;
      }
      case 'PAYMENT_METHOD_CHANGED': {
        const methodName = paymentRequestEvent.methodData.find(
          method => method.supportedMethods === origin
        )?.supportedMethods || origin;
        const newDetails = e.data.methodDetails;
        await notifyMerchantChange(
          e.source,
          () => paymentRequestEvent.changePaymentMethod(methodName, newDetails),
        );
        break;
      }
      case 'SHIPPING_ADDRESS_CHANGED': {
        const newAddress = e.data.shippingAddress;
        await notifyMerchantChange(
          e.source,
          () => paymentRequestEvent.changeShippingAddress(newAddress),
        );
        break;
      }
      case 'SHIPPING_OPTION_CHANGED': {
        const newOption = e.data.shippingOptionId;
        await notifyMerchantChange(
          e.source,
          () => paymentRequestEvent.changeShippingOption(newOption),
        );
        break;
      }
      case 'PAYMENT_AUTHORIZED': {
        // Resolve the payment request event promise with a payment response
        // whose methodName matches the payment method requested by the merchant.
        const methodName = paymentRequestEvent.methodData.find(
          method => method.supportedMethods === origin
        )?.supportedMethods || origin;
        const response = {
          methodName,
          details: {
            id: 'payment credential comes here',
            instrumentId: e.data.instrumentId,
          },
        };
        let { paymentOptions } = paymentRequestEvent;
        if (paymentOptions?.requestBillingAddress) {
          response.details.billingAddress = e.data.billingAddress;
        }
        if (paymentOptions?.requestShipping) {
          response.shippingAddress = e.data.shippingAddress;
          response.shippingOption = e.data.shippingOptionId;
        }
        if (paymentOptions?.requestPayerEmail) {
          response.payerEmail = e.data.payerEmail;
        }
        if (paymentOptions?.requestPayerName) {
          response.payerName = e.data.payerName;
        }
        if (paymentOptions?.requestPayerPhone) {
          response.payerPhone = e.data.payerPhone;
        }
        activeRequests.delete(id);
        resolve(response);
        break;
      }
      case 'CANCEL_PAYMENT':
        // Reject the payment request event promise so Chrome aborts the payment
        // with AbortError and closes the payment window.
        activeRequests.delete(id);
        reject(new DOMException('Payment canceled by user', 'AbortError'));
        break;
    }
  } catch (error) {
    activeRequests.delete(id);
    reject(error);
  }
});
