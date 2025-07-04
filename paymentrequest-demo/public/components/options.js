import { html } from 'https://unpkg.com/lit-html?module';
import {
  editOptionsName,
  editOptionsPhone,
  editOptionsEmail,
  editOptionsBilling,
  editOptionsShipping
} from '../storage/actions.js';
import { store } from '../storage/store.js';
import { ShippingType } from './shipping-type.js';
import { ShippingOptions } from './shipping-options.js';

const editName = e => {
  const checked = e.target.checked;
  store.dispatch(editOptionsName(checked));
};

const editPhone = e => {
  const checked = e.target.checked;
  store.dispatch(editOptionsPhone(checked));
};

const editEmail = e => {
  const checked = e.target.checked;
  store.dispatch(editOptionsEmail(checked));
};

const editBilling = e => {
  const checked = e.target.checked;
  store.dispatch(editOptionsBilling(checked));
};

const editShipping = e => {
  const checked = e.target.checked;
  store.dispatch(editOptionsShipping(checked));
};

export const Options = (paymentRequest) => {
  const options = paymentRequest.options;
  const shippingOptions = paymentRequest.details.shippingOptions;

  return html`
    <div class="form-area">
      <div class="mdc-layout-grid__inner">
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <mwc-formfield label="Buyer Name">
            <mwc-checkbox
              @change="${editName}"
              ?checked="${options.requestPayerName}"></mwc-checkbox>
          </mwc-formfield>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <mwc-formfield label="Buyer Phone">
            <mwc-checkbox
              @change="${editPhone}"
              ?checked="${options.requestPayerPhone}"></mwc-checkbox>
          </mwc-formfield>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <mwc-formfield label="Buyer Email">
            <mwc-checkbox
              @change="${editEmail}"
              ?checked="${options.requestPayerEmail}"></mwc-checkbox>
          </mwc-formfield>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <mwc-formfield label="Buyer Billing Address">
            <mwc-checkbox
              @change="${editBilling}"
              ?checked="${options.requestBillingAddress}"></mwc-checkbox>
          </mwc-formfield>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
          <mwc-formfield label="Shipping">
            <mwc-checkbox
              @change="${editShipping}"
              ?checked="${options.requestShipping}"></mwc-checkbox>
          </mwc-formfield>
        </div>
      </div>
    </div>

    <section class="shipping-options ${options.requestShipping ? '': 'is-disabled'}">
      <h3>Shipping Type</h3>

      ${ShippingType(options)}

      <h2>Shipping Options</h2>
      <p>If you require shipping information (i.e. you have the shipping option ticked above) you can
      provide a set of shipping options for the user to select from.</p>
      <p>The UI will require the user to input an address to ship to which you listen to when it changes
      and accept or deny the address as valid.</p>

      ${ShippingOptions(shippingOptions)}

    </section>`;
}