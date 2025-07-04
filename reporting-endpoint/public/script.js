import { html, render } from 'https://unpkg.com/lit@2.8.0/index.js?module';
import { MDCDataTable } from "https://unpkg.com/@material/data-table@7.0.0?module";

let results = [];

const REPORTING_ORIGIN = location.origin;
const supportedReportTypes = ["coep", "coop", "csp", "deprecation"];
const keyLabelMapping = {
  // Common to COOP, COEP and CSP
  type: "Type",
  disposition: "Disposition",
  // COOP
  effectivePolicy: "Effective Policy",
  nextResponseURL: "Next Reponse URL",
  previousResponseURL: "Previous Reponse URL",
  previousPropertyResponseURL: "Property",
  openerURL: "Opener URL",
  referrer: "Referrer",
  sourceFile: "Source File",
  lineNumber: "Line Number",
  columnNumber: "Column Number",
  openedWindowURL: "Opened Window URL",
  openedWindowInitialURL: "Opened Window Initial URL",
  otherURL: "Other URL",
  // COEP
  destination: "Destination",
  blockedURL: "Blocked URL",
  // CSP
  "document-uri": "Document URI",
  "blocked-uri": "Blocked URI",
  "effective-directive": "Effective directive",
  "original-policy": "Original Policy",
  "referrer": "Referrer",
  "status-code": "Status Code",
  "violated-directive": "Violated directive",
  // Deprecation
  age: "Age",
  anticipatedRemoval: "Anticipated Removal",
  id: "ID",
  message: "Message"
};

const container = document.querySelector("#container");

const generateTableHeader = reportKeys =>
  reportKeys.map(
    reportKey =>
      html`
        <th class="mdc-data-table__header-cell" role="columnheader" scope="col">
          ${keyLabelMapping[reportKey]}
        </th>
      `
  );

const generateTableBody = reportValues =>
  reportValues.map(
    reportValue =>
      html`
        <td class="mdc-data-table__cell">${reportValue}</td>
      `
  );

const renderReport = (report, type) => {
  if (supportedReportTypes.includes(type)) {
    // !mutates! Remove deprecated keys
    if (report['blocked-url']) {
      delete report['blocked-url'];
    }
    const thead = generateTableHeader(Object.keys(report));
    const tbody = generateTableBody(Object.values(report));
    return html`
      <div class="mdc-data-table">
        <div class="mdc-data-table__table-container">
          <table class="mdc-data-table__table" aria-label="COOP Report">
            <thead>
              <tr class="mdc-data-table__header-row">
                ${thead}
              </tr>
            </thead>
            <tbody class="mdc-data-table__content">
              <tr class="mdc-data-table__row">
                ${tbody}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
  // If report type isn't COOP/COEP it's not supported => render as JSON
  return html`
    ${JSON.stringify(result.body)}
  `;
};

const renderHTML = msg =>
  render(
    html`
      ${results.map(result => html`
        <div class="report">
          <span class="badge ${result.type}">${result.type}</span>
          <div class="report-from-url">
            <span class="from">from</span> ${result.url}
          </div>
          ${renderReport(result.body, result.type)}
        </div>`)}`,
    container
  );

renderHTML(results);

const progress = document.querySelector("#progress");

let room = '/'
const paths = location.pathname.split('/');
if (paths[1] != 'post') {
  room = paths[1];
}

const socket = io.connect('/', {
  query: `room=${encodeURIComponent(room)}`
});
progress.indeterminate = false;

socket.on("update", msg => {
  const _msg = JSON.parse(msg);
  results = [..._msg.reverse(), ...results];
  console.log(results);
  renderHTML(results);
});

// const post = async () => {
//   await fetch('/post', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/reports+json'
//     },
//     body: JSON.stringify([{type:'coop', body:{
//       "disposition":"enforce","effectivePolicy":"same-origin-plus-coep","nextResponseURL":"https://third-party-test.glitch.me/popup?coop=same-origin&","type":"navigation-from-response"
//     }}, {type:'coep', body:{
//       "blocked-url":"https://third-party-test.glitch.me/check.svg?","blockedURL":"https://third-party-test.glitch.me/check.svg?","destination":"image","disposition":"enforce","type":"corp"
//     }}])
//   });
// };

// setInterval(post, 3000);
