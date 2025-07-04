import { html } from 'https://unpkg.com/lit-html?module';

export const Result = (result) => {
  return html`<pre>${result}</pre>`;
}