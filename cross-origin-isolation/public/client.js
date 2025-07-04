import { Main } from './main.js';
import { GoogleSignIn } from './gsi.js';
import { GoogleIdentityServices } from './gis.js';
import { CrossOriginPopup } from './popup.js';
import { CrossOriginIframe } from './iframe.js';
import { CrossOriginImage } from './image.js';
import { CrossOriginLocalStorage } from './ls.js';
import { CrossOriginFPWorker } from './fp_worker.js';
import { toast } from './common.js';
import '@material/mwc-button';
import '@material/mwc-snackbar';

const gis = document.querySelector('#gis_container');
if (gis) {
  new GoogleIdentityServices(gis);
}

const gsi = document.querySelector('#gsi_container');
if (gsi) {
  new GoogleSignIn(gsi);
}

const main = document.querySelector('#main_container');
if (main) {
  new Main(main);  
}

const image = document.querySelector('#image_container');
if (image) {
  new CrossOriginImage(image);
}

const iframe = document.querySelector('#iframe_container');
if (iframe) {
  new CrossOriginIframe(iframe);
}

const popup = document.querySelector('#popup_container');
if (popup) {
  new CrossOriginPopup(popup);
}

const worker = document.querySelector('#fp_worker_container');
if (worker) {
  new CrossOriginFPWorker(worker);
}

const ls = document.querySelector('#ls_container');
if (ls) {
  new CrossOriginLocalStorage(ls);
}

document.addEventListener('DOMContentLoaded', e => {
  let text = '';
  if ('crossOriginIsolated' in self) {
    const coi = self.crossOriginIsolated;
    if (coi) {
      text += '`crossOriginIsolated` is enabled. ';
      document.body.style.backgroundColor = '#eeeeff';
    }  else {
      text += '`crossOriginIsolated` is disabled. ';
    }
  } else {
    text += '`crossOriginIsolated` is not supported in this browser. ';
  }
  if ('originAgentCluster' in self) {
    const oac = self.originAgentCluster;
    // if (oac) {
    //   text += '`originAgentCluster` is enabled.';
    // }  else {
    //   text += '`originAgentCluster` is disabled.';
    // }
  } else {
    text += '`originAgentCluster` is not supported in this browser.';
  }
  toast(text);
});
