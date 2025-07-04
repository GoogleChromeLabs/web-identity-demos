import { html } from 'https://unpkg.com/lit-html?module';

export const PaymentButtons = (paymentMethods) => {
  return html`
    <div class="mdc-layout-grid__inner">
      ${paymentMethods.map(paymentMethod => html`
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
        <mwc-button
          icon="account_balance_wallet"
          data-payment-method="${paymentMethod.supportedMethods}"
          @click="${pay}"
          style="--mdc-theme-primary: #33AA33"
          raised>
          BobBucks Pay
        </mwc-button>
      </div>`)}
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
        <div id="google-pay"></div>
      </div>
<!--       <div id="line-pay">
    <img src="https://cdn.glitch.com/5683233d-c450-44bc-944d-32f182095464%2Flinepay_logo_119x39_v3.png?v=1569837529178" width="119" height="39">
    <form method="post" id="linepay_form" action="/linepay/reserve"></form>
  </div> -->
<!--       <div id="paypal"></div> -->
    </div>`;
}