/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {$, _fetch} from './client.js';

export async function authenticate() {
  const options = await _fetch('/auth/signinRequest');

  const publicKey = PublicKeyCredential.parseRequestOptionsFromJSON(options);
  // options.allowCredentials = []; // TODO(bckenny): this is the default, but some case that needs it?

  // Request a conditional UI using the WebAuthn get() method.
  const credential = await navigator.credentials.get({
    publicKey,
    mediation: 'conditional'
  });
  if (!credential) {
    return;
  }
  return await _fetch(`/auth/signinResponse`, credential);
};

/**
 * @param {SubmitEvent} s
 */
async function submit(s) {
  if (!s.target || !(s.target instanceof HTMLFormElement)) return;

  s.preventDefault();
  const formData = new FormData(s.target);
  const login = Object.fromEntries(formData);

  try {
    await _fetch('/auth/username', login);
    location.href = '/reauth';

  } catch(e) {
    // loading.stop();
    console.error(e.message);
    alert(e);
  }
}

async function setup() {
  const form = $('form');
  if (!form) return;
  form.addEventListener('submit', submit);

  // Add passkeys to the browser autofill: Detect features, invoke WebAuthn, and enable a conditional UI.
  if (!window.PublicKeyCredential || !PublicKeyCredential.isConditionalMediationAvailable) {
    return;
  }

  try {
    // Is conditional UI available in this browser?
    const cma = await PublicKeyCredential.isConditionalMediationAvailable();
    if (!cma) {
      return;
    }

    // If conditional UI is available, invoke the authenticate() function.
    const user = await authenticate();
    if (user) {
      // Proceed only when authentication succeeds.
      const usernameInput = $('#username');
      if (!(usernameInput instanceof HTMLInputElement)) {
        return;
      }
      usernameInput.value = user.username; // TODO(bckenny): why is this needed?
      // loading.start();
      location.href = '/profile';
    } else {
      throw new Error('User not found.');
    }
  } catch (e) {
    // loading.stop();
    // A NotAllowedError indicates that the user canceled the operation.
    if (e.name === 'NotAllowedError') {
      return;
    }

    console.error(e);
    alert(e.message);
  }
}

setup();
