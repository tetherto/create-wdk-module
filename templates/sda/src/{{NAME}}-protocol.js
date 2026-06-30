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

import { SdaProtocol } from '@tetherto/wdk-wallet/protocols'

/** @typedef {import('@tetherto/wdk-wallet').IWalletAccount} IWalletAccount */
/** @typedef {import('@tetherto/wdk-wallet').IWalletAccountReadOnly} IWalletAccountReadOnly */

/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaCapabilities} SdaCapabilities */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaRoutesOptions} SdaRoutesOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaRoute} SdaRoute */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaQuoteOptions} SdaQuoteOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaQuote} SdaQuote */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaCreateOptions} SdaCreateOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaDepositAddress} SdaDepositAddress */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaTransfersOptions} SdaTransfersOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaTransfer} SdaTransfer */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaRecoveryOptions} SdaRecoveryOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaRecoveryResult} SdaRecoveryResult */

/**
 * @typedef {Object} {{pascalCase NAME}}ProtocolConfig
 * @property {string} [apiUrl] - Overrides the {{NAME}} API base URL.
 * @property {string} [apiKey] - The {{NAME}} API key, when required.
 * @property {string} [defaultRefundAddress] - Refund address used when a call omits one.
 */

export default class {{pascalCase NAME}}Protocol extends SdaProtocol {
  /**
   * Creates a new {{NAME}} SDA protocol without binding it to a wallet account.
   *
   * @overload
   * @param {undefined} [account] - The wallet account to use to interact with the protocol.
   * @param { {{~pascalCase NAME~}}ProtocolConfig} [config] - The {{NAME}} protocol configuration.
   */

  /**
   * Creates a new read-only {{NAME}} SDA protocol.
   *
   * @overload
   * @param {IWalletAccountReadOnly} account - The wallet account to use to interact with the protocol.
   * @param { {{~pascalCase NAME~}}ProtocolConfig} [config] - The {{NAME}} protocol configuration.
   */

  /**
   * Creates a new {{NAME}} SDA protocol.
   *
   * @overload
   * @param {IWalletAccount} account - The wallet account to use to interact with the protocol.
   * @param { {{~pascalCase NAME~}}ProtocolConfig} [config] - The {{NAME}} protocol configuration.
   */
  constructor (account, config = {}) {
    super(account, config)

    /**
     * The {{NAME}} protocol configuration.
     *
     * @protected
     * @type { {{~pascalCase NAME~}}ProtocolConfig}
     */
    this._config = config
  }

  /**
   * Returns which optional parts of the interface {{NAME}} implements.
   *
   * @returns {SdaCapabilities} The provider's capabilities.
   */
  getCapabilities () {
    // TODO: declare which optional methods {{NAME}} actually implements
    return {
      quoting: false,
      quoteRequired: false,
      reusableAddresses: false,
      multiChainAddress: false,
      custodyModel: 'trusted-operator',
      clientDerivableAddress: false,
      routeDiscovery: 'full',
      getAddress: false,
      transferStatus: false,
      historyByAddress: false,
      historyByRecipient: false,
      recovery: 'none',
      disableAddress: false,
      refund: false
    }
  }

  /**
   * Lists the conversion routes {{NAME}} supports.
   *
   * @param {SdaRoutesOptions} [options] - Optional filters for route discovery.
   * @returns {Promise<SdaRoute[]>} The supported routes.
   */
  async getSupportedRoutes (options) {
    // TODO: Implement {{NAME}} route discovery
  }

  /**
   * Fetches a non-binding quote for a deposit. Only relevant when the provider
   * supports quoting (see {@link getCapabilities}).
   *
   * @param {SdaQuoteOptions} options - The quote options.
   * @returns {Promise<SdaQuote>} The quoted deposit details.
   */
  async quoteDeposit (options) {
    // TODO: Implement {{NAME}} deposit quoting (or remove if unsupported)
  }

  /**
   * Creates a deposit address for the given route and destination.
   *
   * @param {SdaCreateOptions} options - The address creation options.
   * @returns {Promise<SdaDepositAddress[]>} The created deposit addresses, one per distinct address.
   */
  async createDepositAddress (options) {
    // TODO: Implement {{NAME}} deposit-address creation
  }

  /**
   * Looks up an existing deposit address by its identifier or address. Only
   * relevant when the provider supports it (see {@link getCapabilities}).
   *
   * @param {string} id - The deposit-address identifier returned in `SdaDepositAddress.id`.
   * @returns {Promise<SdaDepositAddress>} The deposit address descriptor.
   */
  async getDepositAddress (id) {
    // TODO: Implement {{NAME}} deposit-address lookup (or remove if unsupported)
  }

  /**
   * Lists the deposits observed at a deposit address.
   *
   * @param {string} address - The deposit address to list transfers for.
   * @param {SdaTransfersOptions} [options] - Optional pagination/filtering.
   * @returns {Promise<SdaTransfer[]>} The transfers for the address.
   */
  async getDepositAddressTransfers (address, options) {
    // TODO: Implement {{NAME}} transfer history fetching
  }

  /**
   * Lists transfers aggregated by recipient across all of that recipient's
   * deposit addresses and source chains. Only relevant when the provider
   * supports it (see {@link getCapabilities}).
   *
   * @param {string} recipient - The recipient (destination) address.
   * @param {string | number} destinationChain - The destination chain.
   * @param {SdaTransfersOptions} [options] - Optional pagination/filtering.
   * @returns {Promise<SdaTransfer[]>} The transfers routed to the recipient.
   */
  async getTransfersByRecipient (recipient, destinationChain, options) {
    // TODO: Implement {{NAME}} recipient-keyed history (or remove if unsupported)
  }

  /**
   * Retrieves the status of a single transfer by its identifier. Only relevant
   * when the provider supports it (see {@link getCapabilities}).
   *
   * @param {string} id - The transfer identifier.
   * @returns {Promise<SdaTransfer>} The transfer's current status.
   */
  async getTransferStatus (id) {
    // TODO: Implement {{NAME}} transfer status fetching (or remove if unsupported)
  }

  /**
   * Recovers a deposit or address that was not picked up automatically. Only
   * relevant when the provider supports it (see {@link getCapabilities}).
   *
   * @param {SdaRecoveryOptions} options - The recovery options.
   * @returns {Promise<SdaRecoveryResult>} The recovery outcome.
   */
  async recoverDepositAddress (options) {
    // TODO: Implement {{NAME}} reindex/reactivate recovery (or remove if unsupported)
  }

  /**
   * Disables a deposit address so it no longer accepts deposits. Only relevant
   * when the provider supports it (see {@link getCapabilities}).
   *
   * @param {string} id - The deposit-address identifier returned in `SdaDepositAddress.id`.
   * @returns {Promise<void>}
   */
  async disableDepositAddress (id) {
    // TODO: Implement {{NAME}} address disabling (or remove if unsupported)
  }
}
