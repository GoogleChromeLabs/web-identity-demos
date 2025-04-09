/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {$, _fetch} from './client.js';

const form = $('#form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const form = new FormData(e.target);
  const cred = {};
  form.forEach((v, k) => cred[k] = v);
  _fetch(e.target.action, cred)
  .then(user => {
    location.href = '/profile';
  })
  .catch(e => alert(e));
});
