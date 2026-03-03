// Copyright {{YEAR}} {{AUTHOR}}
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

import WalletManager from '@tetherto/wdk-wallet'

import WalletAccount{{pascalCase NAME}} from './wallet-account-{{NAME}}.js'

/** @typedef {import('@tetherto/wdk-wallet').FeeRates} FeeRates */

/** @typedef {import('./wallet-account-read-only-{{NAME}}.js').{{pascalCase NAME}}WalletConfig} {{pascalCase NAME}}WalletConfig */

export default class WalletManager{{pascalCase NAME}} extends WalletManager {
  /**
   * Creates a new wallet manager for the {{NAME}} blockchain.
   *
   * @param {string | Uint8Array} seed - The wallet's [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) seed.
   * @param { {{~pascalCase NAME~}}WalletConfig} [config] - The configuration object.
   */
  constructor (seed, config = {}) {
    super(seed, config)

    /**
     * The {{NAME}} wallet configuration.
     *
     * @protected
     * @type { {{~pascalCase NAME~}}WalletConfig}
     */
    this._config = config
  }

  /**
   * Returns the wallet account at a specific index (see [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)).
   *
   * @param {number} [index] - The index of the account to get (default: 0).
   * @returns {Promise<WalletAccount{{pascalCase NAME}}>} The account.
   */
  async getAccount (index = 0) {
    // TODO: Update derivation path according to {{NAME}}
    const account = await this.getAccountByPath(`0'/0/${index}`)

    return account
  }

  /**
   * Returns the wallet account at a specific BIP-44 derivation path.
   *
   * @param {string} path - The derivation path (e.g. "0'/0/0").
   * @returns {Promise<WalletAccount{{pascalCase NAME}}>} The account.
   */
  async getAccountByPath (path) {
    if (!this._accounts[path]) {
      const account = await WalletAccount{{pascalCase NAME}}.at(this.seed, path, this._config)

      this._accounts[path] = account
    }

    return this._accounts[path]
  }

  /**
   * Returns the current fee rates.
   *
   * @returns {Promise<FeeRates>} The fee rates (in base units).
   */
  async getFeeRates () {
    // TODO: Implement blockchain-specific fee rate fetching
  }
}
