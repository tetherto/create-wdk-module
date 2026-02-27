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

import { WalletAccountReadOnly } from '@tetherto/wdk-wallet'

/** @typedef {import('@tetherto/wdk-wallet').TransactionResult} TransactionResult */
/** @typedef {import('@tetherto/wdk-wallet').TransferOptions} TransferOptions */
/** @typedef {import('@tetherto/wdk-wallet').TransferResult} TransferResult */

/**
 * @typedef {Object} {{pascalCase NAME}}Transaction
 * @property {string} to - The transaction's recipient.
 * @property {number | bigint} value - The amount of native coins to send to the recipient (in base units).
 */

/**
 * @typedef {Object} {{pascalCase NAME}}WalletConfig
 * @property {number | bigint} [transferMaxFee] - The maximum fee amount for transfer operations.
 */

export default class WalletAccountReadOnly{{pascalCase NAME}} extends WalletAccountReadOnly {
  /**
   * Creates a new {{NAME}} read-only wallet account.
   *
   * @param {string} [address] - The account's address.
   * @param {{{pascalCase NAME}}WalletConfig} [config] - The configuration object.
   */
  constructor (address, config = {}) {
    super(address)

    /**
     * The wallet account configuration.
     *
     * @protected
     * @type {Omit<{{pascalCase NAME}}WalletConfig, 'transferMaxFee'>}
     */
    this._config = config
  }

  /**
   * Verifies a message's signature.
   *
   * @param {string} message - The original message.
   * @param {string} signature - The signature to verify.
   * @returns {Promise<boolean>} True if the signature is valid.
   */
  async verify (message, signature) {
    // TODO: Implement blockchain-specific message verifying
  }

  /**
   * Returns the account's native coin balance.
   *
   * @returns {Promise<bigint>} The native coin balance (in base units).
   */
  async getBalance () {
    // TODO: Implement blockchain-specific balance fetching
  }

  /**
   * Returns the account balance for a specific token.
   *
   * @param {string} tokenAddress - The smart contract address of the token.
   * @returns {Promise<bigint>} The token balance (in base units).
   */
  async getTokenBalance (tokenAddress) {
    // TODO: Implement blockchain-specific token balance fetching
  }

  /**
   * Quotes the costs of a send transaction operation.
   *
   * @param {{{pascalCase NAME}}Transaction} tx - The transaction.
   * @returns {Promise<Omit<TransactionResult, 'hash'>>} The transaction's quotes.
   */
  async quoteSendTransaction (tx) {
    // TODO: Implement blockchain-specific transaction fee estimation
  }

  /**
   * Quotes the costs of a transfer operation.
   *
   * @param {TransferOptions} options - The transfer's options.
   * @returns {Promise<Omit<TransferResult, 'hash'>>} The transfer's quotes.
   */
  async quoteTransfer (options) {
    // TODO: Implement blockchain-specific transfer fee estimation
  }

  /**
   * Returns a transaction's receipt.
   *
   * @param {string} hash - The transaction's hash.
   * @returns {Promise<unknown | null>} The receipt, or null if the transaction has not been included in a block yet.
   */
  async getTransactionReceipt (hash) {
    // TODO: Implement blockchain-specific transaction receipt fetching
  }
}
