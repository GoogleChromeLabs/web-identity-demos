import { coep_opts, corp_opts, cors_opts } from './opts.js';
import { html, render, TP_BASE_URL, renderOptions } from './common.js';

export class CrossOriginTPWorker {
  constructor(parent, parentWorker) {
    this.parent = parent;
    let _url = `${TP_BASE_URL}/worker.js?`;

    let val = localStorage.getItem(`tp_worker_report`);
    if (val) _url += `report-only&`;
    this.reportOnly = val;

    val = localStorage.getItem(`tp_worker_cors`);
    if (val) _url += `cors=${val}&`;
    this.cors = val;

    val = localStorage.getItem(`tp_worker_coep`);
    if (val) _url += `coep=${val}&`;
    this.coep = val;

    val = localStorage.getItem(`tp_worker_corp`);
    if (val) _url += `corp=${val}&`;
    this.corp = val;
    this.url = _url;
    
    this.worker = parentWorker;

    this.render();
  }
  render() {
    render(html`
        <h3>Set various headers for a cross-origin *sub*worker script.</h3>
        <label for="tp_worker_report">Report Only</label>
        <input type="checkbox" id="tp_worker_report" ?checked="${this.reportOnly}" @change="${this.change.bind(this)}"/><br/>
        <label for="tp_worker_cors">Cross-Origin Resource Sharing</label>
        <select id="tp_worker_cors" @change="${this.change.bind(this)}">
          ${renderOptions(this.cors, ['--', ...cors_opts])}
        </select><br>
        <label for="tp_worker_coep">Cross-Origin-Embedder-Policy</label>
        <select id="tp_worker_coep" @change="${this.change.bind(this)}">
          ${renderOptions(this.coep, ['--', ...coep_opts])}
        </select><br>
        <label for="tp_worker_corp">Cross-Origin-Resource-Policy</label>
        <select id="tp_worker_corp" @change="${this.change.bind(this)}">
          ${renderOptions(this.corp, ['--', ...corp_opts])}
        </select><br>
        <input type="text" id="tp_worker_url" .value="${this.url}" style="width:500px">
        <mwc-button id="load_tp_worker" @click="${this.load.bind(this)}" raised>
          Load a worker
        </mwc-button><br/>
        <mwc-button id="postmessage_tp_worker" @click="${this.postMessage.bind(this)}">
          Send a postMessage
        </mwc-button>`, this.parent);
  }
  change(e) {
    let _url = `${TP_BASE_URL}/worker.js?`;

    if (e.target.id == 'tp_worker_report') this.reportOnly = e.target.checked;
    if (this.reportOnly) {
      localStorage.setItem(`tp_worker_report`, 'true');
      _url += `report-only&`;
    } else {
      localStorage.removeItem(`tp_worker_report`);
    }

    if (e.target.id == 'tp_worker_cors') this.cors = e.target.value;
    if (this.cors) {
      _url += `cors=${encodeURIComponent(this.cors)}&`;
      localStorage.setItem(`tp_worker_cors`, this.cors);
    } else {
      localStorage.removeItem(`tp_worker_cors`);
    }

    if (e.target.id == 'tp_worker_coep') this.coep = e.target.value;
    if (this.coep) {
      _url += `coep=${encodeURIComponent(this.coep)}&`;
      localStorage.setItem(`tp_worker_coep`, this.coep);
    } else {
      localStorage.removeItem(`tp_worker_coep`);
    }

    if (e.target.id == 'tp_worker_corp') this.corp = e.target.value;
    if (this.corp) {
      _url += `corp=${encodeURIComponent(this.corp)}&`;
      localStorage.setItem(`tp_worker_corp`, this.corp);
    } else {
      localStorage.removeItem(`tp_worker_corp`);
    }
    this.url = _url;
    this.render();
  }
  load() {
    this.worker.postMessage({ url: this.url });
  }
  postMessage() {
    this.worker.postMessage({ message: '*' }); 
  }
}
