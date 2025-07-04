import { html, render, nothing } from 'lit';

const FP_BASE_URL = 'https://cross-origin-isolation.glitch.me';
const TP_BASE_URL = 'https://third-party-test.glitch.me';

const renderOptions = (value, options) => {
  return html`${options.map(option =>
    html`<option value="${option == '--' ? '' : option}" ?selected="${value == option}">${option}</option> `
  )}`;
};

const toast = text => {
  const snackbar = document.querySelector('#toast');
  if (snackbar) {
    console.info(text);
    snackbar.labelText = text;
    if (snackbar.show)
      snackbar.show();
  }
}

if ('ReportingObserver' in window) {
  const observer = new ReportingObserver((reports, observer) => {
    // toast(`${reports.length} reports detected. See console for details.`);
    for (let report of reports) {
      console.info(report);
    }
  });

  observer.observe();  
}

try {
  const a = new SharedArrayBuffer(1);
  // toast(`SharedArrayBuffer is available.`);
  console.info(`SharedArrayBuffer is available.`);
} catch (e) {
  // toast(`SharedArrayBuffer is not available.`);
  console.info(`SharedArrayBuffer is not available.`);
}

export { FP_BASE_URL, TP_BASE_URL, renderOptions, toast, html, render, nothing };
