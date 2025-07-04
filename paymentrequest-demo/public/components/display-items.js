import { html } from 'https://unpkg.com/lit-html?module';
import {
  initDisplayItems,
  addDisplayItem,
  editDisplayItemLabel,
  editDisplayItemValue,
  editDisplayItemCurrency,
  removeDisplayItem
} from '../storage/actions.js';
import { store } from '../storage/store.js';

const init = () => {
  if (confirm(`Display Items will be initialized.
Are you sure you want to proceed?`)) {
    store.dispatch(initDisplayItems());
  }
}

const add = () => {
  store.dispatch(addDisplayItem());
};

const editLabel = e => {
  const index = parseInt(e.target.dataset.index);
  const label = e.target.value;
  store.dispatch(editDisplayItemLabel(index, label));
};

const editValue = e => {
  const index = parseInt(e.target.dataset.index);
  const value = e.target.value;
  store.dispatch(editDisplayItemValue(index, value));
};

const editCurrency = e => {
  const index = parseInt(e.target.dataset.index);
  const currency = e.target.value;
  store.dispatch(editDisplayItemCurrency(index, currency));
};

const remove = e => {
  const index = parseInt(e.target.dataset.index);
  if (confirm('Are you sure you want to remove this display item?')) {
    store.dispatch(removeDisplayItem(index));
  }
}

export const DisplayItems = (displayItems) => {
  return html`
    <div class="form-area">
      <div class="mdc-layout-grid__inner">
        ${displayItems.map((displayItem, i) => html`
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-5">
          <mwc-textfield
            label="Label"
            size="38"
            @change="${editLabel}"
            value="${displayItem.label}"
            outlined></mwc-textfield>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
          <mwc-textfield
            label="Amount"
            size="30"
            pattern="-?[0-9](\.[0-9]+)?"
            @change="${editValue}"
            value="${displayItem.amount.value}"
            outlined></mwc-textfield>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
          <mwc-textfield
            label="Currency"
            @change="${editCurrency}"
            value="${displayItem.amount.currency}"
            outlined></mwc-textfield>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-1">
          <mwc-icon-button
            icon="delete_forever"
            data-index="${i}"
            @click="${remove}"></mwc-icon-button>
        </div>`)}
      </div>
    </div>

    <mwc-button @click="${add}" raised>Add a display item</mwc-button>
    <mwc-button @click="${init}">Initialize Display Items</mwc-button>`;
}