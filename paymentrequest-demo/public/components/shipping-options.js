import { html } from 'https://unpkg.com/lit-html?module';
import {
  initShippingOptions,
  addShippingOption,
  editShippingOptionId,
  editShippingOptionLabel,
  editShippingOptionValue,
  editShippingOptionCurrency,
  editShippingOptionSelected,
  removeShippingOption
} from '../storage/actions.js';
import { store } from '../storage/store.js';

const init = () => {
  if (confirm(`Shipping Options will be initialized.
Are you sure you want to proceed?`)) {
    store.dispatch(initShippingOptions());
  }
}

const add = () => {
  store.dispatch(addShippingOption());
};

const editIdentifier = e => {
  const index = parseInt(e.target.dataset.index);
  const supportedMethods = e.target.value;
  store.dispatch(editShippingOptionId(index, supportedMethods));
};

const editLabel = e => {
  const index = parseInt(e.target.dataset.index);
  const data = e.target.value;
  store.dispatch(editShippingOptionLabel(index, data));
};

const editValue = e => {
  const index = parseInt(e.target.dataset.index);
  const data = e.target.value;
  store.dispatch(editShippingOptionValue(index, data));
};

const editCurrency = e => {
  const index = parseInt(e.target.dataset.index);
  const data = e.target.value;
  store.dispatch(editShippingOptionCurrency(index, data));
};

const editSelected = e => {
  const index = parseInt(e.target.dataset.index);
  const checked = e.target.checked;
  store.dispatch(editShippingOptionSelected(index, checked));
};

const remove = e => {
  const index = parseInt(e.target.dataset.index);
  if (confirm('Are you sure you want to remove this shipping option?')) {
    store.dispatch(removeShippingOption(index));
  }
}

export const ShippingOptions = (shippingOptions) => {
  return html`
    <div class="form-area">
      <div class="mdc-layout-grid__inner">
        ${shippingOptions.map((shippingOption, i) => html`
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <mwc-textfield
            label="ID"
            data-index="${i}"
            @change="${editIdentifier}"
            value="${shippingOption.id}"
            outlined></mwc-textfield>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <mwc-textfield
            label="Label"
            data-index="${i}"
            @change="${editLabel}"
            value="${shippingOption.label}"
            outlined></mwc-textfield>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <mwc-textfield
            label="Amount"
            pattern="-?[0-9]*(\.[0-9]+)?"
            data-index="${i}"
            @change="${editValue}"
            value="${shippingOption.amount.value}"
            outlined></mwc-textfield>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <mwc-textfield
            label="Currency"
            data-index="${i}"
            @change="${editCurrency}"
            value="${shippingOption.amount.currency}"
            outlined></mwc-textfield>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <mwc-formfield label="Selected">
            <mwc-checkbox
              data-index="${i}"
              @change="${editSelected}"
              ?checked="${shippingOption.selected}"
              ></mwc-checkbox>
          </mwc-formfield>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-1">
          <mwc-icon-button
            icon="delete_forever"
            data-index="${i}"
            @click="${remove}"></mwc-icon-button>
        </div>`)}
      </div>
    </div>

    <mwc-button @click="${add}" raised>Add a shipping option</mwc-button>
    <mwc-button @click="${init}">Initialize Shipping Options</mwc-button>`;
}