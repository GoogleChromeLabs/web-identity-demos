const phoneForm = document.querySelector('#phone-form');
const message = document.querySelector('#message');
const copy = document.querySelector('#copy');
const verify = document.querySelector('#verify');
const sb = document.querySelector('#snackbar');
const install = document.querySelector('#install');

const snackbarAlert = text => {
  sb.labelText = text;
  sb.show();
}

copy.addEventListener('click', async e => {
  e.preventDefault();
  const range = document.createRange();
  range.selectNode(message);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  snackbarAlert('Message copied.');
});
verify.addEventListener('click', e => e.target.closest('form').submit());

if (!window.OTPCredential) {
  const caution = document.querySelector('#unsupported');
  caution.classList.add('visible');
}

message.innerText = `Your OTP is: 123456.

@${window.location.host} #123456`;  
