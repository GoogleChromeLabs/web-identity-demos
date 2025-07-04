import { html, render, TP_BASE_URL, renderOptions, toast } from './common.js';

export class GoogleSignIn {
  constructor(parent) {
    this.parent = parent;
    gapi.load('auth2', () => {
      gapi.auth2.init();
      this.instance = gapi.auth2.getAuthInstance();
      this.isSignedIn = this.instance.isSignedIn.get();
    });
    this.render();
  }
  render() {
    render(html`
    <div id="google-signin"
      @click="${this.toggle.bind(this)}"
      class="${this.isSignedIn ? 'signed-in' : 'signed-out'}"></div>
    `, this.parent);
  }
  async toggle(e) {
    if (this.instance.isSignedIn.get()) {
      await this.instance.signOut();
      this.isSignedIn = false;
      toast('Signed Out');
      this.render();
    } else {
      const user = await this.instance.signIn()
      this.isSignedIn = true;
      console.log(user);
      toast('Signed In');
      this.render();
    }
  }
}
