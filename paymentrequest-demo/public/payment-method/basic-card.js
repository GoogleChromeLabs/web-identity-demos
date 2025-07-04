/**
 * Set up Basic Card
 **/
const bc_button = document.querySelector('#basic-card');

if (bc_button) {
  bc_button.addEventListener('click', e => {
    pay({
      supportedMethods: 'basic-card',
      data: {}
    });
  });  
}
