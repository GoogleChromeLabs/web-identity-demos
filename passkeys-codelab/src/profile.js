/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {$, base64url, _fetch} from './client.js';
import { html, render } from 'lit-html';

async function updateCredential(credId, newName) {
  return _fetch(`/auth/renameKey`, { credId, newName });
}

async function unregisterCredential(credId) {
  return _fetch(`/auth/removeKey?credId=${encodeURIComponent(credId)}`);
};

// TODO: Add an ability to create a passkey: Create the registerCredential() function.
async function registerCredential() {
  // TODO: Add an ability to create a passkey: Obtain the challenge and other options from the server endpoint.
  const options = await _fetch('/auth/registerRequest');

  // TODO: Add an ability to create a passkey: Create a credential.
  // Base64URL decode some values.
  options.user.id = base64url.decode(options.user.id);
  options.challenge = base64url.decode(options.challenge);

  if (options.excludeCredentials) {
    for (const cred of options.excludeCredentials) {
      cred.id = base64url.decode(cred.id);
    }
  }

  // Use platform authenticator and discoverable credential.
  options.authenticatorSelection = {
    authenticatorAttachment: 'platform',
    requireResidentKey: true
  }

  // Invoke the WebAuthn create() method.
  const cred = await navigator.credentials.create({
    publicKey: options,
  });

  // TODO: Add an ability to create a passkey: Register the credential to the server endpoint.
  const credential = {};
  credential.id = cred.id;
  credential.rawId = cred.id; // Pass a Base64URL encoded ID string.
  credential.type = cred.type;

  // The authenticatorAttachment string in the PublicKeyCredential object is a new addition in WebAuthn L3.
  if (cred.authenticatorAttachment) {
    credential.authenticatorAttachment = cred.authenticatorAttachment;
  }

  // Base64URL encode some values.
  const clientDataJSON = base64url.encode(cred.response.clientDataJSON);
  const attestationObject = base64url.encode(cred.response.attestationObject);

  // Obtain transports.
  const transports = cred.response.getTransports ? cred.response.getTransports() : [];

  credential.response = {
    clientDataJSON,
    attestationObject,
    transports
  };

  return await _fetch('/auth/registerResponse', credential);
};


async function changeDisplayName(e) {
  const newName = prompt('Enter a new display name', e.target.dataset.displayName);
  if (newName) {
    // loading.start();
    await _fetch('/auth/updateDisplayName', { newName });
    // loading.stop();
    renderDisplayName();
  }
}

async function renderDisplayName() {
  const res = await _fetch('/auth/userinfo');
  render(html`
    <li>
      <span class="item-text">${res.displayName || res.username}</span>
      <button
          data-display-name="${res.displayName || res.username }"
          @click="${changeDisplayName}"
          title="Edit your display name">
          <span class="material-symbols-outlined">edit</span>
      </button>
    </li>`, $('#display-names'));
};

renderDisplayName();

async function rename(e) {
  const { credId, name } = e.target.dataset;
  const newName = prompt('Enter a new credential name.', name);
  if (newName.length === 0) return;
  try {
    // loading.start();
    await updateCredential(credId, newName);
    // loading.stop();
    renderCredentials();
  } catch (e) {
    // loading.stop();
    console.error(e);
    alert(e.message);
  }
};

async function remove(e) {
  if (!confirm('Do you really want to remove this credential?')) return;

  try {
    // loading.start();
    await unregisterCredential(e.target.dataset.credId);
    // loading.stop();
    renderCredentials();
  } catch (e) {
    // loading.stop();
    console.error(e);
    alert(e.message);
  }
};

// TODO: Add an ability to create a passkey: Check for passkey support.
const createPasskey = $('#create-passkey');
// Feature detections
if (window.PublicKeyCredential &&
    PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable &&
    PublicKeyCredential.isConditionalMediationAvailable) {
  try {
    const results = await Promise.all([

      // Is platform authenticator available in this browser?
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),

      // Is conditional UI available in this browser?
      PublicKeyCredential.isConditionalMediationAvailable()
    ]);

    if (results.every(r => r === true)) {
      // If conditional UI is available, reveal the Create a passkey button.
      createPasskey.classList.remove('hidden');
    } else {

      // If conditional UI isn't available, show a message.
      $('#message').textContent = 'This device does not support passkeys.';
    }
  } catch (e) {
    console.error(e);
  }
} else {

  // If WebAuthn isn't available, show a message.
  $('#message').textContent = 'This device does not support passkeys.';
}

// TODO: Add an ability to create a passkey: Render registered passkeys in a list.
async function renderCredentials() {
  const res = await _fetch('/auth/getKeys');
  const list = $('#passkeys');
  const creds = html`${res.length > 0 ? html`
      ${res.map(cred => html`
        <li>
          <span>${cred.name || 'Unnamed' }</span>
          <button data-cred-id="${cred.id}"
            data-name="${cred.name || 'Unnamed' }" @click="${rename}">
            <span class="material-symbols-outlined">edit</span>
          </button>
          <button data-cred-id="${cred.id}" @click="${remove}">
            <span class="material-symbols-outlined">delete</span>
          </button>
      </li>`)}` : html`
    <li>No credentials found.</li>`}`;
  render(creds, list);
};

renderCredentials();

// TODO: Add an ability to create a passkey: Create and register a passkey.
async function register() {
  try {

    // Start the loading UI.
    // loading.start();

    // Start creating a passkey.
    await registerCredential();

    // Stop the loading UI.
    // loading.stop();

    // Render the updated passkey list.
    renderCredentials();
  } catch (e) {
    // Stop the loading UI.
    // loading.stop();

    // An InvalidStateError indicates that a passkey already exists on the device.
    if (e.name === 'InvalidStateError') {
      alert('A passkey already exists for this device.');

    // A NotAllowedError indicates that the user canceled the operation.
    } else if (e.name === 'NotAllowedError') {
      Return;

    // Show other errors in an alert.
    } else {
      alert(e.message);
      console.error(e);
    }
  }
};

createPasskey.addEventListener('click', register);
