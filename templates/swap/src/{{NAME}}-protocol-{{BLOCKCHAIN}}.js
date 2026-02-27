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

import { SwapProtocol } from '@tetherto/wdk-wallet/protocols'

/** @typedef {import('@tetherto/wdk-wallet').IWalletAccount} IWalletAccount */
/** @typedef {import('@tetherto/wdk-wallet').IWalletAccountReadOnly} IWalletAccountReadOnly */

/** @typedef {import('@tetherto/wdk-wallet/protocols').SwapProtocolConfig} SwapProtocolConfig */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SwapOptions} SwapOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SwapResult} SwapResult */

export default class {{pascalCase NAME}}Protocol{{pascalCase BLOCKCHAIN}} extends SwapProtocol {
  /**
   * Creates a new read-only interface to the {{NAME}} protocol for the {{BLOCKCHAIN}} blockchain.
   *
   * @overload
   * @param {IWalletAccountReadOnly} account - The wallet account to use to interact with the protocol.
   * @param {SwapProtocolConfig} [config] - The swap protocol configuration.
   */

  /**
   * Creates a new interface to the {{NAME}} protocol for the {{BLOCKCHAIN}} blockchain.
   *
   * @overload
   * @param {IWalletAccount} account - The wallet account to use to interact with the protocol.
   * @param {SwapProtocolConfig} [config] - The swap protocol configuration.
   */
  constructor (account, config = {}) {
    super(account, config)
  }

  /**
   * Swaps a pair of tokens.
   *
   * @param {SwapOptions} options - The swap's options.
   * @returns {Promise<SwapResult>} The swap's result.
   */
  async swap (options) {
    // TODO: Implement protocol-specific swap
  }

  /**
   * Quotes the costs of a swap operation.
   *
   * @param {SwapOptions} options - The swap's options.
   * @returns {Promise<Omit<SwapResult, 'hash'>>} The swap's quote.
   */
  async quoteSwap (options) {
    // TODO: Implement protocol-specific swap fee estimation
  }
}
