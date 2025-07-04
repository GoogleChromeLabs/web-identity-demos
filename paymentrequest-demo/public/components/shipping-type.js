import { html } from 'https://unpkg.com/lit-html?module';
import {
  editOptionsShippingType,
  removeOptionsShippingType
} from '../storage/actions.js';
import { store } from '../storage/store.js';

const editShippingType = e => {
  const type = e.target.value;
  store.dispatch(editOptionsShippingType(type));
};

const removeShippingType = e => {
  store.dispatch(removeOptionsShippingType());
}

export const ShippingType = (options) => {
  return html`
    <div class="form-area">
      <div class="mdc-layout-grid__inner">
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <mwc-formfield label="No Type (i.e. default)">
            <mwc-radio
              name="options"
              @change="${removeShippingType}"
              ?checked="${options.shippingType === undefined}"
              value=""></mwc-radio>
          </mwc-formfield>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <mwc-formfield label="Shipping">
            <mwc-radio
              name="options"
              @change="${editShippingType}"
              ?checked="${options.shippingType == 'shipping'}"
              value="shipping"></mwc-radio>
          </mwc-formfield>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <mwc-formfield label="Delivery">
            <mwc-radio
              name="options"
              @change="${editShippingType}"
              ?checked="${options.shippingType == 'delivery'}"
              value="delivery"></mwc-radio>
          </mwc-formfield>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <mwc-formfield label="Pickup">
            <mwc-radio
              name="options"
              @change="${editShippingType}"
              ?checked="${options.shippingType == 'pickup'}"
              value="pickup"></mwc-radio>
          </mwc-formfield>
        </div>
      </div>
    </div>`;
}