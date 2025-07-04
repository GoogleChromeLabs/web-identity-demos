/**
 * Set up Sample Pay
 **/
const hp_button = document.querySelector('#handler-pay');

if (hp_button) {
  hp_button.addEventListener('click', async e => {
    pay({
      supportedMethods: 'https://payment-handler-example2.appspot.com',
      data: {}
    });
  });
}
