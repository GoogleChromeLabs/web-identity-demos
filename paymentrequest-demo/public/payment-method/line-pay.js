/**
 * Set up LINE Pay
 **/
const lp_button = document.querySelector('#line-pay');

if (lp_button) {
  lp_button.addEventListener('click', async e => {
    const form = document.querySelector('#linepay_form');
    const input = document.createElement('input');
    input.name = 'item';
    input.value = item.label;
    form.appendChild(input.cloneNode());
    input.name = 'price';
    input.value = '6500';
    form.appendChild(input.cloneNode());
    input.name = 'currency';
    input.value = 'JPY';
    form.appendChild(input.cloneNode());
    form.submit();
  });  
}
