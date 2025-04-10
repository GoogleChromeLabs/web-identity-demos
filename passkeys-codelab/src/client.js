/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @param {string} path
 * @param {string|Credential|Record<string, FormDataEntryValue>} payload
 */
export async function authFetch(path, payload = '') {
  /** @type {Record<string, string>} */
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
  };
  // TODO(bckenny): verify that FormData is never actually passed in.
  if (payload && !(payload instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(payload);
  }
  const res = await fetch(path, {
    method: 'POST',
    credentials: 'same-origin',
    headers: headers,
    body: payload,
  });
  if (res.status === 200) {
    // Server authentication succeeded
    return res.json();
  } else {
    // Server authentication failed
    const result = await res.json();
    throw new Error(result.error);
  }
};
