import { html } from 'https://unpkg.com/lit-html?module';
import {
  editTotalLabel,
  editTotalValue,
  editTotalCurrency
} from '../storage/actions.js';
import { store } from '../storage/store.js';

const editLabel = e => {
  const index = parseInt(e.target.dataset.index);
  const label = e.target.value;
  store.dispatch(editTotalLabel(index, label));
};

const editValue = e => {
  const index = parseInt(e.target.dataset.index);
  const value = e.target.value;
  store.dispatch(editTotalValue(index, value));
};

const editCurrency = e => {
  const index = parseInt(e.target.dataset.index);
  const currency = e.target.value;
  store.dispatch(editTotalCurrency(index, currency));
};

export const Total = (total) => {
  return html`
    <div class="form-area">
      <div class="mdc-layout-grid__inner">
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-5">
          <mwc-textfield
            label="Label"
            size="38"
            @change="${editLabel}"
            value="${total.label}"
            outlined></mwc-textfield>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
          <mwc-textfield
            label="Amount"
            size="30"
            pattern="-?[0-9](\.[0-9]+)?"
            @change="${editValue}"
            value="${total.amount.value}"
            outlined></mwc-textfield>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <mwc-textfield
            label="Currency"
            @change="${editCurrency}"
            value="${total.amount.currency}"
            outlined></mwc-textfield>
        </div>
      </div>
    </div>`;
}