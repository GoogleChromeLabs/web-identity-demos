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

const payBtn = document.querySelector('#pay');
const result = document.querySelector('#result');

if (payBtn) {
  payBtn.addEventListener('click', async () => {
    if (!window.PaymentRequest) {
      result.textContent = 'PaymentRequest API is not supported on this browser.';
      return;
    }

    const methodData = [{
      supportedMethods: location.origin,
    }];

    const shippingOptions = [
      {
        id: 'standard',
        label: 'Standard Shipping ($0.00)',
        amount: { currency: 'USD', value: '0.00' },
        selected: true,
      },
      {
        id: 'express',
        label: 'Express Shipping ($5.00)',
        amount: { currency: 'USD', value: '5.00' },
        selected: false,
      },
    ];

    const details = {
      total: {
        label: 'Total',
        amount: { currency: 'USD', value: '10.00' },
      },
      shippingOptions,
    };

    const options = {
      requestShipping: true,
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: true,
      requestBillingAddress: true,
    };

    try {
      const request = new PaymentRequest(methodData, details, options);

      request.addEventListener('shippingaddresschange', e => {
        e.updateWith(details);
      });

      request.addEventListener('shippingoptionchange', e => {
        const selectedId = request.shippingOption;
        for (const option of shippingOptions) {
          option.selected = option.id === selectedId;
        }
        details.total.amount.value = selectedId === 'express' ? '15.00' : '10.00';
        e.updateWith(details);
      });

      request.addEventListener('paymentmethodchange', e => {
        e.updateWith(details);
      });

      const response = await request.show();
      await response.complete('success');
      result.textContent = JSON.stringify(response, null, 2);
    } catch (err) {
      result.textContent = err.toString();
    }
  });
}