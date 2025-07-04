import { coep_opts, coop_opts, corp_opts, xfo_opts } from './opts.js';
import { html, render, TP_BASE_URL, renderOptions } from './common.js';

export class CrossOriginIframe {
  constructor(parent) {
    this.parent = parent;
    let _url = `${TP_BASE_URL}/iframe?`;
    
    let val = localStorage.getItem(`iframe_allow`);
    this.allow = val == 'true';
    
    val = localStorage.getItem(`iframe_credentialless`);
    this.credentialless = val == 'true';

    val = localStorage.getItem(`iframe_coep`);
    if (val) _url += `coep=${val}&`;
    this.coep = val;

    val = localStorage.getItem(`iframe_coop`);
    if (val) _url += `coop=${val}&`;
    this.coop = val;

    val = localStorage.getItem(`iframe_corp`);
    if (val) _url += `corp=${val}&`;
    this.corp = val;
    
    val = localStorage.getItem(`iframe_xfo`);
    if (val) _url += `xfo=${val}&`;
    this.xfo = val;

    this.url = _url;
    this.iframe_url = this.url;

    window.addEventListener('message', e => {
      // alert('message received');
    });

    this.render();
  }
  render() {
    render(html`
        <iframe
          id="iframe"
          src="${this.iframe_url}"
          allow="${this.allow ? 'cross-origin-isolated':''}"
          ?credentialless="${this.credentialless}"
          width="620"
          height="200"></iframe><br/>
        <label for="iframe_allow">Allow cross-origin isolated inside iframe</label>
        <input type="checkbox" id="iframe_allow" ?checked="${this.allow}" @change="${this.change.bind(this)}"/><br/>
        <label for="iframe_credentialless">Make iframe credentialless</label>
        <input type="checkbox" id="iframe_credentialless" ?checked="${this.credentialless}" @change="${this.change.bind(this)}"/><br/>
        <label for="iframe_coep">Cross-Origin-Embedder-Policy:</label>
        <select id="iframe_coep" @change="${this.change.bind(this)}">
          ${renderOptions(this.coep, ['--', ...coep_opts])}
        </select><br>
        <label for="iframe_coop">Cross-Origin-Opener-Policy:</label>
        <select id="iframe_coop" @change="${this.change.bind(this)}">
          ${renderOptions(this.coop, ['--', ...coop_opts])}
        </select><br>
        <label for="iframe_corp">Cross-Origin-Resource-Policy:</label>
        <select id="iframe_corp" @change="${this.change.bind(this)}">
          ${renderOptions(this.corp, ['--', ...corp_opts])}
        </select><br>
        <label for="iframe_xfo">X-Frame-Options:</label>
        <select id="iframe_xfo" @change="${this.change.bind(this)}">
          ${renderOptions(this.xfo, ['--', ...xfo_opts])}
        </select><br>
        <input type="text" id="iframe_url" style="width:500px" value="${this.url}">
        <mwc-button id="reload_iframe" @click="${this.reload.bind(this)}" raised>Reload the iframe</mwc-button><br/>
        <mwc-button id="postmessage_iframe" @click="${this.postMessage.bind(this)}">Send a postMessage</mwc-button>`, this.parent);
  }
  change(e) {
    let _url = `${TP_BASE_URL}/iframe?`;
    if (e.target.id == 'iframe_allow') this.allow = e.target.checked;
    if (e.target.id == 'iframe_credentialless') this.credentialless = e.target.checked;
    if (e.target.id == 'iframe_coep') this.coep = e.target.value;
    if (e.target.id == 'iframe_coop') this.coop = e.target.value;
    if (e.target.id == 'iframe_corp') this.corp = e.target.value;
    if (e.target.id == 'iframe_xfo') this.xfo = e.target.value;
    if (!!this.allow) {
      localStorage.setItem(`iframe_allow`, 'true');
    } else {
      localStorage.removeItem(`iframe_allow`);
    }
    if (!!this.credentialless) {      
      localStorage.setItem(`iframe_credentialless`, 'true');
    } else {
      localStorage.removeItem(`iframe_credentialless`);
    }
    if (this.coep) {
      _url += `coep=${encodeURIComponent(this.coep)}&`;
      localStorage.setItem(`iframe_coep`, this.coep);
    } else {
      localStorage.removeItem(`iframe_coep`);
    }
    if (this.coop) {
      _url += `coop=${encodeURIComponent(this.coop)}&`;
      localStorage.setItem(`iframe_coop`, this.coop);
    } else {
      localStorage.removeItem(`iframe_coop`);
    }
    if (this.corp) {
      _url += `corp=${encodeURIComponent(this.corp)}&`;
      localStorage.setItem(`iframe_corp`, this.corp);
    } else {
      localStorage.removeItem(`iframe_corp`);
    }
    if (this.xfo) {
      _url += `xfo=${encodeURIComponent(this.xfo)}&`;
      localStorage.setItem(`iframe_xfo`, this.xfo);
    } else {
      localStorage.removeItem(`iframe_xfo`);
    }
    this.url = _url;
    this.render();
  }
  reload(e) {
    e.preventDefault();
    const iframe_url = document.querySelector('#iframe_url');
    this.iframe_url = iframe_url.value;
    this.render();
  }
  postMessage() {
    const iframe = document.querySelector('#iframe');
    iframe.contentWindow.postMessage('test', '*');
  }
}
