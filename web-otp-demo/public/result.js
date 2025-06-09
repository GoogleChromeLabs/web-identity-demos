const back = document.querySelector('#back');
const sb = document.querySelector('#snackbar');

const snackbarAlert = text => {
  sb.labelText = text;
  sb.show();
}

snackbarAlert('You are successfully verified!');

back.addEventListener('click', e => {
  location.href = 'index.html';
});
