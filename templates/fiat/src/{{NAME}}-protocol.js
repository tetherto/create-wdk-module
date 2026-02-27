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

import { FiatProtocol } from '@tetherto/wdk-wallet/protocols'

/** @typedef {import('@tetherto/wdk-wallet').IWalletAccount} IWalletAccount */
/** @typedef {import('@tetherto/wdk-wallet').IWalletAccountReadOnly} IWalletAccountReadOnly */

/** @typedef {import('@tetherto/wdk-wallet/protocols').BuyOptions} BuyOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').BuyResult} BuyResult */

/** @typedef {import('@tetherto/wdk-wallet/protocols').SellOptions} SellOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SellResult} SellResult */

/** @typedef {import('@tetherto/wdk-wallet/protocols').FiatQuote} FiatQuote */
/** @typedef {import('@tetherto/wdk-wallet/protocols').FiatTransactionDetail} FiatTransactionDetail */

/** @typedef {import('@tetherto/wdk-wallet/protocols').SupportedCryptoAsset} SupportedCryptoAsset */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SupportedFiatCurrency} SupportedFiatCurrency */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SupportedCountry} SupportedCountry */

export default class {{pascalCase NAME}}Protocol extends FiatProtocol {
  /**
   * Creates a new interface to interact with the {{NAME}} protocol without binding it to a wallet account.
   *
   * @overload
   * @param {undefined} [account] - The wallet account to use to interact with the protocol.
   */

  /**
   * Creates a new read-only interface to interact with the {{NAME}} protocol.
   *
   * @overload
   * @param {IWalletAccountReadOnly} account - The wallet account to use to interact with the protocol.
   */

  /**
   * Creates a new interface to interact with the {{NAME}} protocol.
   *
   * @overload
   * @param {IWalletAccount} account - The wallet account to use to interact with the protocol.
   */
  constructor (account) {
    super(account)
  }

  /**
   * Generates a URL for a user to purchase a crypto asset with fiat currency.
   *
   * @param {BuyOptions} options - The options for the buy operation.
   * @returns {Promise<BuyResult>} The URL for the user to complete the purchase.
   */
  async buy (options) {
    // TODO: Implement protocol-specific buy
  }

  /**
   * Gets a quote for a crypto asset purchase.
   *
   * @param {Omit<BuyOptions, 'recipient'>} options - The options for the buy operation.
   * @returns {Promise<FiatQuote>} The quote for the transaction.
   */
  async quoteBuy (options) {
    // TODO: Implement protocol-specific buy fee estimation
  }

  /**
   * Generates a URL for a user to sell a crypto asset for fiat currency.
   *
   * @param {SellOptions} options - The options for the sell operation.
   * @returns {Promise<SellResult>} The URL for the user to complete the sale.
   */
  async sell (options) {
    // TODO: Implement protocol-specific sell
  }

  /**
   * Gets a quote for a crypto asset sale.
   *
   * @param {Omit<SellOptions, 'refundAddress'>} options - The options for the sell operation.
   * @returns {Promise<FiatQuote>} The quote for the transaction.
   */
  async quoteSell (options) {
    // TODO: Implement protocol-specific sell fee estimation
  }

  /**
   * Retrieves the details of a specific transaction from the provider.
   *
   * @param {string} txId - The unique identifier of the transaction.
   * @returns {Promise<FiatTransactionDetail>} The transaction details.
   */
  async getTransactionDetail (txId) {
    // TODO: Implement protocol-specific transaction detail fetching
  }

  /**
   * Retrieves a list of supported crypto assets from the provider.
   *
   * @returns {Promise<SupportedCryptoAsset[]>} An array of supported crypto assets.
   */
  async getSupportedCryptoAssets () {
    // TODO: Implement protocol-specific supported crypto assets fetching
  }

  /**
   * Retrieves a list of supported fiat currencies from the provider.
   *
   * @returns {Promise<SupportedFiatCurrency[]>} An array of supported fiat currencies.
   */
  async getSupportedFiatCurrencies () {
    // TODO: Implement protocol-specific supported fiat currencies fetching
  }

  /**
   * Retrieves a list of supported countries or regions from the provider.
   *
   * @returns {Promise<SupportedCountry[]>} An array of supported countries.
   */
  async getSupportedCountries () {
    // TODO: Implement protocol-specific supported countries fetching
  }
}
