const otpForm = document.querySelector('#otp-form');
const otpField = new mdc.textField.MDCTextField(document.querySelector('#otp-field'));
const cancel = document.querySelector('#cancel');
const cont = document.querySelector('#continue');
const progress = document.querySelector('#progress');
const sb = document.querySelector('#snackbar');
const input = document.querySelector('input[autocomplete="one-time-code"]');

const snackbarAlert = text => {
  sb.labelText = text;
  sb.show();
}

const submit = e => {
  if (!otpForm.checkValidity()) {
    const message = 'Please enter a valid one time code.';
    snackbarAlert(message);
    return;
  }
  const form = input.closest('form');
  progress.indeterminate = true;
  otpField.disabled = true;
  cancel.disabled = true;
  cont.disabled = true;
  snackbarAlert('Verifying...');
  setTimeout(() => {
    window.location.href = form.action;
  }, 1000);
};

if ('OTPCredential' in window) {
  window.addEventListener('DOMContentLoaded', e => {
    if (!input) return;
    const ac = new AbortController();
    const form = input.closest('form');
    if (form) {
      form.addEventListener('submit', e => {
        ac.abort();
      });
    }
    navigator.credentials.get({
      otp: { transport:['sms'] },
      signal: ac.signal
    }).then(otp => {
      otpField.value = otp.code;
      if (form) {
        submit();
      }
    }).catch(err => {
      console.log(err);
    });
  });
}

cont.addEventListener('click', submit);

cancel.addEventListener('click', e => {
  location.href = 'index.html';
});
