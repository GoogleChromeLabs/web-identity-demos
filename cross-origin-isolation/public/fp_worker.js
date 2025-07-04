import { coep_opts, corp_opts } from './opts.js';
import { html, render, toast, FP_BASE_URL, renderOptions } from './common.js';
import { CrossOriginTPWorker } from './tp_worker.js'

export class CrossOriginFPWorker {
  constructor(parent) {
    this.parent = parent;
    let _url = `${FP_BASE_URL}/1p_worker.js?`;

    let val = localStorage.getItem(`fp_worker_report`);
    if (val) _url += `report-only&`;
    this.reportOnly = val;

    val = localStorage.getItem(`fp_worker_coep`);
    if (val) _url += `coep=${val}&`;
    this.coep = val;

    val = localStorage.getItem(`fp_worker_corp`);
    if (val) _url += `corp=${val}&`;
    this.corp = val;
    this.url = _url;

    this.render();
  }
  render() {
    render(html`
        <label for="fp_worker_report">Report Only</label>
        <input type="checkbox" id="fp_worker_report" ?checked="${this.reportOnly}" @change="${this.change.bind(this)}"/><br/>
        <label for="fp_worker_coep">Cross-Origin-Embedder-Policy</label>
        <select id="fp_worker_coep" @change="${this.change.bind(this)}">
          ${renderOptions(this.coep, ['--', ...coep_opts])}
        </select><br>
        <label for="fp_worker_corp">Cross-Origin-Resource-Policy</label>
        <select id="fp_worker_corp" @change="${this.change.bind(this)}">
          ${renderOptions(this.corp, ['--', ...corp_opts])}
        </select><br>
        <input type="text" id="fp_worker_url" .value="${this.url}" style="width:500px">
        <mwc-button id="load_fp_worker" @click="${this.load.bind(this)}" raised ?disabled="${this.worker}">
          Load a worker
        </mwc-button><br/>
        <mwc-button id="postmessage_fp_worker" @click="${this.postMessage.bind(this)}" ?disabled="${!this.worker}">
          Send a postMessage
        </mwc-button>
        <div id="tp_worker_container"><div>`, this.parent);
  }
  change(e) {
    let _url = `${FP_BASE_URL}/1p_worker.js?`;

    if (e.target.id == 'fp_worker_report') this.reportOnly = e.target.checked;
    if (this.reportOnly) {
      localStorage.setItem(`fp_worker_report`, 'true');
      _url += `report-only&`;
    } else {
      localStorage.removeItem(`fp_worker_report`);
    }

    if (e.target.id == 'fp_worker_coep') this.coep = e.target.value;
    if (this.coep) {
      _url += `coep=${encodeURIComponent(this.coep)}&`;
      localStorage.setItem(`fp_worker_coep`, this.coep);
    } else {
      localStorage.removeItem(`fp_worker_coep`);
    }

    if (e.target.id == 'fp_worker_corp') this.corp = e.target.value;
    if (this.corp) {
      _url += `corp=${encodeURIComponent(this.corp)}&`;
      localStorage.setItem(`fp_worker_corp`, this.corp);
    } else {
      localStorage.removeItem(`fp_worker_corp`);
    }
    this.url = _url;
    this.render();
  }
  load() {
    this.worker = new Worker(this.url);
    this.worker.addEventListener('error', e => {
      console.error(e);
      toast('Spawning a worker failed.');
      this.worker = null;
    });
    this.worker.addEventListener('message', e => {
      toast(e.data.message);
      const container = document.querySelector('#tp_worker_container');
      if (container) {
        new CrossOriginTPWorker(container, this.worker);
      }
      this.render();
    });
  }
  postMessage() {
    this.worker.postMessage({ fp_message: true }); 
  }
}
