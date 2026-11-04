let registration;
const registerBtn = document.querySelector('#register');

// When the "Register" button is clicked...
registerBtn.addEventListener('click', async e => {

  // Feature detection: Is service worker available?
  if ('serviceWorker' in navigator) {

    // Register the payment handler service worker.
    navigator.serviceWorker.register('service-worker.js');

    // PaymentManager requires the service worker to be active.
    // One simple method to activate a service worker is through
    // a `ready` promise.
    registration = await navigator.serviceWorker.ready;

    // Another feature detection: Is payment handler available?
    if (!registration.paymentManager) {
      alert('payment handler api not available on this browser!');
      return;
    }

    // Register this payment handler's delegation capabilities
    await registration.paymentManager.enableDelegations([
      'shippingAddress', 'payerName', 'payerPhone', 'payerEmail'
    ]);

    alert('payment app registered!');

  } else {

    alert('service worker not available on this browser');

    return;
  }
});