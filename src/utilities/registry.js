// Copyright 2024 Tether Operations Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict'

const REGISTRY_URL = 'https://registry.npmjs.org'

const OFFICIAL_SCOPE = '@tetherto'

/**
 * Checks whether an official WDK package with the given name exists on npm (e.g. '@tetherto/wdk-wallet-evm' for
 * 'wdk-wallet-evm').
 *
 * @param {string} moduleName - The unscoped module name.
 * @param {Object} [options] - The options.
 * @param {number} [options.timeout] - The request timeout in milliseconds (default: 5000).
 * @returns {Promise<boolean | undefined>} True if the package exists, false if it doesn't, or undefined if the
 *   registry couldn't be reached.
 */
export async function isOfficialPackage (moduleName, { timeout = 5_000 } = {}) {
  const packageName = encodeURIComponent(`${OFFICIAL_SCOPE}/${moduleName}`)

  try {
    const response = await fetch(`${REGISTRY_URL}/${packageName}`, {
      headers: { accept: 'application/vnd.npm.install-v1+json' },
      signal: AbortSignal.timeout(timeout)
    })

    if (response.ok) {
      return true
    }

    if (response.status === 404) {
      return false
    }

    return undefined
  } catch {
    return undefined
  }
}

export { OFFICIAL_SCOPE }
