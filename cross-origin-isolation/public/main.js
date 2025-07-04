import { coep_opts, coop_opts, corp_opts } from './opts.js';
import { html, render, FP_BASE_URL, renderOptions, toast } from './common.js';

export class Main {
  constructor(parent) {
    this.parent = parent;
    let _url = new URL(location.href);

    ['report-only', 'coep', 'coop', 'corp', 'oac'].forEach(key => {
      if (key == 'report-only' && _url.searchParams.has('report-only')) {
        this.reportOnly = true;
        return;
      }
      if (key == 'oac' && _url.searchParams.has('oac')) {
        this.oac = true;
        return;
      }
      if (_url.searchParams.has(key)) {
        this[key] = _url.searchParams.get(key);
      }
    });

    this.url = location.href;
    // window.addEventListener('message', )
    this.render();
  }
  render() {
    render(html`
        <label for="main_oac">Origin Agent Cluster</label>
        <input type="checkbox" id="main_oac" ?checked="${this.oac}" @change="${this.change.bind(this)}"/><br/>
        <label for="main_report">Report Only</label>
        <input type="checkbox" id="main_report" ?checked="${this.reportOnly}" @change="${this.change.bind(this)}"/><br/>
        <label for="main_coep">Cross-Origin-Embedder-Policy:</label>
        <select id="main_coep" @change="${this.change.bind(this)}">
          ${renderOptions(this.coep, ['--', ...coep_opts])}
        </select><br>
        <label for="main_coop">Cross-Origin-Opener-Policy:</label>
        <select id="main_coop" @change="${this.change.bind(this)}">
          ${renderOptions(this.coop, ['--', ...coop_opts])}
        </select><br>
        <label for="main_corp">Cross-Origin-Resource-Policy:</label>
        <select id="main_corp" @change="${this.change.bind(this)}">
          ${renderOptions(this.corp, ['--', ...corp_opts])}
        </select><br>
        <input type="text" id="main_url" value="${this.url}" style="width:500px">`, this.parent);
  }
  change(e) {
    let _url = `${location.origin}${location.pathname}?`;
    if (e.target.id == 'main_gis') this.gis = e.target.checked;
    if (this.gis) {
      _url += `gis&`;
    }

    if (e.target.id == 'main_oac') this.oac = e.target.checked;
    if (this.oac) {
      _url += `oac&`;
    }

    if (e.target.id == 'main_report') this.reportOnly = e.target.checked;
    if (this.reportOnly) {
      _url += `report-only&`;
    }

    if (e.target.id == 'main_coep') this.coep = e.target.value;
    if (this.coep) {
      _url += `coep=${encodeURIComponent(this.coep)}&`;
    }

    if (e.target.id == 'main_coop') this.coop = e.target.value;
    if (this.coop) {
      _url += `coop=${encodeURIComponent(this.coop)}&`;
    }

    if (e.target.id == 'main_corp') this.corp = e.target.value;
    if (this.corp) {
      _url += `corp=${encodeURIComponent(this.corp)}&`;
    }

    this.url = _url;
    this.reload();
  }
  reload() {
    location.href = this.url;
  }
}
