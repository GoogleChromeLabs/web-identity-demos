/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {authFetch} from './client.js';

/**
 * @param {SubmitEvent} s
 */
async function submitHandler(s) {
  if (!(s.target instanceof HTMLFormElement)) return;

  s.preventDefault();
  const formData = new FormData(s.target);
  const login = Object.fromEntries(formData);

  try {
    await authFetch('/auth/password', login);
    location.href = '/profile';

  } catch(e) {
    console.error(e.message);
    alert(e);
  }
}

async function setup() {
  const form = document.querySelector('form');
  if (!form) return;
  form.addEventListener('submit', submitHandler);
}

setup();
