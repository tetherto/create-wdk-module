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

import { LendingProtocol } from '@tetherto/wdk-wallet/protocols'

/** @typedef {import('@tetherto/wdk-wallet').IWalletAccount} IWalletAccount */
/** @typedef {import('@tetherto/wdk-wallet').IWalletAccountReadOnly} IWalletAccountReadOnly */

/** @typedef {import('@tetherto/wdk-wallet/protocols').BorrowOptions} BorrowOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').BorrowResult} BorrowResult */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SupplyOptions} SupplyOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SupplyResult} SupplyResult */
/** @typedef {import('@tetherto/wdk-wallet/protocols').WithdrawOptions} WithdrawOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').WithdrawResult} WithdrawResult */
/** @typedef {import('@tetherto/wdk-wallet/protocols').RepayOptions} RepayOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').RepayResult} RepayResult */

export default class {{pascalCase NAME}}Protocol{{pascalCase BLOCKCHAIN}} extends LendingProtocol {
  /**
   * Creates a new read-only interface to the {{NAME}} protocol for the {{BLOCKCHAIN}} blockchain.
   *
   * @overload
   * @param {IWalletAccountReadOnly} account - The wallet account to use to interact with the protocol.
   */

  /**
   * Creates a new interface to the {{NAME}} protocol for the {{BLOCKCHAIN}} blockchain.
   *
   * @overload
   * @param {IWalletAccount} account - The wallet account to use to interact with the protocol.
   */
  constructor (account) {
    super(account)
  }

  /**
   * Supplies a specific token amount to the lending pool.
   *
   * @param {SupplyOptions} options - The supply's options.
   * @returns {Promise<SupplyResult>} The supply's result.
   */
  async supply (options) {
    // TODO: Implement protocol-specific supply
  }

  /**
   * Quotes the costs of a supply operation.
   *
   * @param {SupplyOptions} options - The supply's options.
   * @returns {Promise<Omit<SupplyResult, 'hash'>>} The supply's quotes.
   */
  async quoteSupply (options) {
    // TODO: Implement protocol-specific supply fee estimation
  }

  /**
   * Withdraws a specific token amount from the pool.
   *
   * @param {WithdrawOptions} options - The withdraw's options.
   * @returns {Promise<WithdrawResult>} The withdraw's result.
   */
  async withdraw (options) {
    // TODO: Implement protocol-specific withdraw
  }

  /**
   * Quotes the costs of a withdraw operation.
   *
   * @param {WithdrawOptions} options - The withdraw's options.
   * @returns {Promise<Omit<WithdrawResult, 'hash'>>} The withdraw's quotes.
   */
  async quoteWithdraw (options) {
    // TODO: Implement protocol-specific withdraw fee estimation
  }

  /**
   * Borrows a specific token amount.
   *
   * @param {BorrowOptions} options - The borrow's options.
   * @returns {Promise<BorrowResult>} The borrow's result.
   */
  async borrow (options) {
    // TODO: Implement protocol-specific borrow
  }

  /**
   * Quotes the costs of a borrow operation.
   *
   * @param {BorrowOptions} options - The borrow's options.
   * @returns {Promise<Omit<BorrowResult, 'hash'>>} The borrow's quotes.
   */
  async quoteBorrow (options) {
    // TODO: Implement protocol-specific borrow fee estimation
  }

  /**
   * Repays a specific token amount.
   *
   * @param {RepayOptions} options - The repay's options.
   * @returns {Promise<RepayResult>} The repay's result.
   */
  async repay (options) {
    // TODO: Implement protocol-specific repay
  }

  /**
   * Quotes the costs of a repay operation.
   *
   * @param {RepayOptions} options - The repay's options.
   * @returns {Promise<Omit<RepayResult, 'hash'>>} The repay's quotes.
   */
  async quoteRepay (options) {
    // TODO: Implement protocol-specific repay fee estimation
  }
}
