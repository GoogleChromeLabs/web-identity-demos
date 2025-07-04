import { html, render, nothing, TP_BASE_URL, renderOptions, toast } from './common.js';

export class GoogleIdentityServices {
  constructor(parent) {
    this.parent = parent;
    // const client_id = document.querySelector('meta[name="google-signin-client_id"]').content;
    // this.button = document.querySelector('#google-signin');
    // google.accounts.id.initialize({
    //   client_id: client_id,
    //   auto_select: true,
    //   login_uri: `${location.origin}/callback`,
    //   ux_mode: 'redirect',
    //   use_fedcm_for_prompt: true
    // });
    // google.accounts.id.renderButton(this.button, {
    //   theme: 'filled_blue',
    //   locale: 'en_US'
    // });
    let _url = `${TP_BASE_URL}/iframe?`;
    let val = localStorage.getItem(`gis_fedcm`);
    this.fedcm = val === 'true';
    this.render();
  }
  render() {
    // render(html`
    // <div id="google-signin"></div>
    // `, this.parent);
    const client_id = document.querySelector('meta[name="google-signin-client_id"]').content;
    render(html`
    <div id="g_id_onload"
         data-client_id="${client_id}"
         data-auto_prompt="true"
         data-use_fedcm_for_prompt="${this.fedcm?'true':nothing}"
         data-login_uri="${location.origin}/callback"
         data-callback="loginCallback">
    </div>
    <label for="gis_fedcm">Use FedCM for identity federation</label>
    <input type="checkbox" id="gis_fedcm" ?checked="${this.fedcm}" @change="${this.change.bind(this)}"/>
    `, this.parent);
  }
  change(e) {
    let _url = `${TP_BASE_URL}/iframe?`;
    if (e.target.id == 'gis_fedcm') this.fedcm = e.target.checked;
    if (!!this.fedcm) {
      localStorage.setItem(`gis_fedcm`, 'true');
    } else {
      localStorage.removeItem(`gis_fedcm`);
    }
    this.render();
  }
  // async toggle(e) {
  //   if (this.instance.isSignedIn.get()) {
  //     await this.instance.signOut();
  //     this.isSignedIn = false;
  //     toast('Signed Out');
  //     this.render();
  //   } else {
  //     const user = await this.instance.signIn()
  //     this.isSignedIn = true;
  //     console.log(user);
  //     toast('Signed In');
  //     this.render();
  //   }
  // }
}
