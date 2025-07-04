/**
 * Set up PayPal
 **/
const pl_button = document.querySelector('#paypal');
const paypal_client_id = document.querySelector('meta[name="paypal_sandbox_client_id"]').content;

paypal.Button.render({
  env: 'sandbox',
  client: {
    sandbox: paypal_client_id
  },
  locale: 'en_US',
  style: {
    size: 'responsive',
    color: 'blue',
    shape: 'rect',
    tagline: false,
    label: 'paypal'
  },
  commit: false,
  payment: (data, actions) => {
    actions.request.post('/paypal/reserve').then(result => {
      return result.id;
    });
  },
  onAuthorize: async (data, actions) => {
    actions.request.post('/paypal/confirm', {
      paymentId: data.paymentID,
      payerId: data.payerID
    }).then(result => {
      if (result.success) alert('payment success')
    });
  }
}, '#paypal');