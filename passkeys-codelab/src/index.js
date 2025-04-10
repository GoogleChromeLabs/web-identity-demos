/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {authFetch} from './client.js';

/**
 * Makes a conditional call to WebAuthn `navigator.credentials.get()`, and
 * fulfills if the user selects an autofill passkey with whether the
 * selected credential is valid.
 * Note that the Promise this function returns will never be fulfilled if the
 * user does not select an autofill passkey.
 * @return {Promise<boolean>}
 */
export async function conditionalAuthenticate() {
  const options = await authFetch('/auth/signinRequest');

  const publicKey = PublicKeyCredential.parseRequestOptionsFromJSON(options);

  // Request a conditional passkey autofill using the WebAuthn get() method.
  const credential = await navigator.credentials.get({
    publicKey,
    mediation: 'conditional'
  });
  if (!credential) return false;

  await authFetch(`/auth/signinResponse`, credential);
  return true;
};

/**
 * @param {SubmitEvent} s
 */
async function submitHandler(s) {
  if (!(s.target instanceof HTMLFormElement)) return;

  s.preventDefault();
  const formData = new FormData(s.target);
  const login = Object.fromEntries(formData);

  try {
    await authFetch('/auth/username', login);
    location.href = '/reauth';

  } catch(e) {
    console.error(e.message);
    alert(e);
  }
}

async function setup() {
  const form = document.querySelector('form');
  if (!form) return;
  form.addEventListener('submit', submitHandler);

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

    if (await conditionalAuthenticate()) {
      location.href = '/profile';
      return;
    }

    throw new Error('User not found.');
  } catch (e) {
    // A NotAllowedError indicates that the user canceled the operation.
    if (e.name === 'NotAllowedError') {
      return;
    }

    console.error(e);
    alert(e.message);
  }
}

setup();
