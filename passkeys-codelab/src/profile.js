/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {authFetch} from './client.js';
import {html, render} from 'lit-html';

/**
 * @param {string} credId
 * @param {string} newName
 * @return {Promise<void>}
 */
async function updateCredential(credId, newName) {
  await authFetch(`/auth/renameKey`, {credId, newName});
}

/**
 * @param {string} credId
 * @return {Promise<void>}
 */
async function unregisterCredential(credId) {
  await authFetch(`/auth/removeKey?credId=${encodeURIComponent(credId)}`);
};

/**
 * @param {string} newName
 * @return {Promise<void>}
 */
async function updateDisplayName(newName) {
  await authFetch('/auth/updateDisplayName', {newName});
}

/** @param {PointerEvent} clickEvent */
async function changeDisplayName(clickEvent) {
  if (!(clickEvent.currentTarget instanceof HTMLElement)) return;

  const oldName = clickEvent.currentTarget.dataset.displayName ?? '';
  const newName = prompt('Enter a new display name', oldName);
  if (newName) {
    await updateDisplayName(newName)
    renderDisplayName();
  }
}

async function renderDisplayName() {
  const displayNameContainer = document.querySelector('#display-names');
  if (!(displayNameContainer instanceof HTMLElement)) return;

  /** @type {{displayName: string, username: string}} */
  const res = await authFetch('/auth/userinfo');
  render(html`
    <li>
      <span class="item-text">${res.displayName || res.username}</span>
      <button
          data-display-name="${res.displayName || res.username }"
          @click="${changeDisplayName}"
          title="Edit your display name">
          <span class="material-symbols-outlined">edit</span>
      </button>
    </li>`, displayNameContainer);
};

/** @param {PointerEvent} clickEvent */
async function renamePasskey(clickEvent) {
  if (!(clickEvent.currentTarget instanceof HTMLElement)) return;

  const {credId, name} = clickEvent.currentTarget.dataset ?? {};
  const newName = prompt('Enter a new credential name.', name);
  if (!credId || !newName) return;

  try {
    await updateCredential(credId, newName);
    renderPasskeys();
  } catch (e) {
    console.error(e);
    alert(e.message);
  }
};

/** @param {PointerEvent} clickEvent */
async function removePasskey(clickEvent) {
  if (!confirm('Do you really want to remove this credential?')) return;
  if (!(clickEvent.currentTarget instanceof HTMLElement)) return;
  const credId = clickEvent.currentTarget.dataset.credId;
  if (!credId) return;

  try {
    await unregisterCredential(credId);
    renderPasskeys();
  } catch (e) {
    console.error(e);
    alert(e.message);
  }
};

/**
 * Render registered passkeys in a list.
 */
async function renderPasskeys() {
  const list = document.querySelector('#passkeys');
  if (!(list instanceof HTMLElement)) return;

  /** @type {Array<{name: string, id: string}>} */
  const res = await authFetch('/auth/getKeys');

  const creds = html`${res.length > 0 ? html`
      ${res.map(cred => html`
        <li>
          <span>${cred.name || 'Unnamed' }</span>
          <button data-cred-id="${cred.id}"
            data-name="${cred.name || 'Unnamed' }" @click="${renamePasskey}">
            <span class="material-symbols-outlined">edit</span>
          </button>
          <button data-cred-id="${cred.id}" @click="${removePasskey}">
            <span class="material-symbols-outlined">delete</span>
          </button>
      </li>`)}` : html`
    <li>No credentials found.</li>`}`;
  render(creds, list);
};

/**
 * Create and register a passkey.
 */
async function registerPasskey() {
  try {
    // Obtain the challenge and other options from the server endpoint.
    const options = await authFetch('/auth/registerRequest');
    // TODO(bckenny): uses platform authenticator and discoverable credential by default, but need to manaully ensure this?
    const publicKey = PublicKeyCredential.parseCreationOptionsFromJSON(options);

    // Invoke the WebAuthn create() method.
    const credential = await navigator.credentials.create({publicKey});
    if (!credential) return false;

    // Register the credential to the server endpoint.
    await authFetch('/auth/registerResponse', credential);

    // Render the updated passkey list.
    renderPasskeys();
  } catch (e) {
    // An InvalidStateError indicates that a passkey already exists on the device.
    if (e.name === 'InvalidStateError') {
      alert('A passkey already exists for this device.');
      console.error(e);

    // A NotAllowedError indicates that the user canceled the operation.
    } else if (e.name === 'NotAllowedError') {
      return;

    // Show other errors in an alert.
    } else {
      alert(e.message);
      console.error(e);
    }
  }
};

function addNoSupportWarning() {
  const logElement = document.querySelector('#no-passkeys');
  if (logElement) {
    logElement.textContent = 'This device does not support passkeys.';
  }
}

async function setup() {
  renderDisplayName();
  renderPasskeys();

  // Add an ability to create a passkey: Check for passkey support.
  const createPasskeyButton = document.querySelector('#create-passkey');

  // Feature detections
  if (!window.PublicKeyCredential ||
      !PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable ||
      !PublicKeyCredential.isConditionalMediationAvailable) {
    addNoSupportWarning();
    return;
  }

  try {
    const results = await Promise.all([
      // Is platform authenticator available in this browser?
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
      // Is conditional UI available in this browser?
      PublicKeyCredential.isConditionalMediationAvailable()
    ]);

    if (!results.every(Boolean)) {
      addNoSupportWarning();
      return;
    }

    // If fully available, enable the 'Create a passkey' button.
    createPasskeyButton?.classList.remove('hidden');
    createPasskeyButton?.addEventListener('click', registerPasskey);
  } catch (e) {
    alert(e.message);
    console.error(e);
  }
}

setup();
