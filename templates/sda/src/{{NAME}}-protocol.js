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

/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaRoutesOptions} SdaRoutesOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaRoute} SdaRoute */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaDepositOptions} SdaDepositOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaDepositQuote} SdaDepositQuote */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaCreateDepositAddressOptions} SdaCreateDepositAddressOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaDepositAddress} SdaDepositAddress */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaTransfersOptions} SdaTransfersOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaTransfer} SdaTransfer */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaRecoveryOptions} SdaRecoveryOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaRecoveryResult} SdaRecoveryResult */

/**
 * @typedef {Object} {{pascalCase NAME}}ProtocolConfig
 * @property {string} [apiUrl] - Overrides the {{NAME}} API base URL.
 * @property {string} [apiKey] - The {{NAME}} API key, when required.
 */

/**
 * {{pascalCase NAME}} SDA protocol.
 *
 * Document {{NAME}}'s descriptive traits here: custody model (self-custodial vs
 * trusted-operator), activation lifecycle (live on creation, activation-required,
 * or ttl), and how routes are discovered (all at once vs per source/destination
 * chain pair). Delete any optional operation {{NAME}} does not support — the base
 * class already throws `UnsupportedOperationError` for those.
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
    super(account)

    /**
     * The {{NAME}} protocol configuration.
     *
     * @protected
     * @type { {{~pascalCase NAME~}}ProtocolConfig}
     */
    this._config = config
  }

  /**
   * Lists the conversion routes {{NAME}} supports.
   *
   * @param {SdaRoutesOptions} [options] - Optional filters for route discovery.
   * @returns {Promise<SdaRoute[]>} The supported routes.
   * @throws {ValueError} If {{NAME}} discovers routes by blockchain pairs and the source or destination blockchain is not set.
   */
  async getSupportedRoutes (options) {
    // TODO: Implement {{NAME}} route discovery
  }

  /**
   * Creates deposit addresses for the given route and destination.
   *
   * @param {SdaCreateDepositAddressOptions} options - The address creation options.
   * @returns {Promise<SdaDepositAddress[]>} The created deposit addresses, one per distinct address.
   * @throws {ValueError} If `destinationAddress` is omitted and no account was bound at construction.
   */
  async createDepositAddress (options) {
    // TODO: Implement {{NAME}} deposit-address creation
  }

  /**
   * Fetches a non-binding quote (estimate) for a deposit — what a given deposit would deliver.
   * Optional: delete this override if {{NAME}} does not support quoting.
   *
   * @param {SdaDepositOptions} options - The quote options.
   * @returns {Promise<SdaDepositQuote>} The quoted deposit details.
   * @throws {ValueError} If {{NAME}} requires an output asset and none is provided.
   */
  async quoteDeposit (options) {
    // TODO: Implement {{NAME}} deposit quoting (or delete if unsupported)
  }

  /**
   * Derives a deposit address client-side, without a protocol call or activation.
   * Optional: delete this override if {{NAME}} addresses are not client-derivable.
   *
   * @param {SdaCreateDepositAddressOptions} options - The same options passed to createDepositAddress.
   * @returns {Promise<string>} The derived deposit address.
   * @throws {ValueError} If `destinationAddress` is omitted and no account was bound at construction.
   */
  async deriveDepositAddress (options) {
    // TODO: Implement {{NAME}} client-side derivation (or delete if unsupported)
  }

  /**
   * Looks up an existing deposit address by its identifier.
   * Optional: delete this override if {{NAME}} does not expose address lookup.
   *
   * @param {string} id - The deposit-address identifier returned in `SdaDepositAddress.id`.
   * @returns {Promise<SdaDepositAddress>} The deposit address descriptor.
   * @throws {NoSuchElementError} If no such address exists.
   */
  async getDepositAddress (id) {
    // TODO: Implement {{NAME}} deposit-address lookup (or delete if unsupported)
  }

  /**
   * Refreshes the activation of a deposit address so {{NAME}} keeps monitoring it.
   * Optional: delete this override if {{NAME}} addresses do not expire.
   *
   * @param {string} id - The deposit-address identifier returned in `SdaDepositAddress.id`.
   * @returns {Promise<SdaDepositAddress>} The refreshed deposit address descriptor.
   */
  async renewDepositAddress (id) {
    // TODO: Implement {{NAME}} activation refresh (or delete if unsupported)
  }

  /**
   * Lists the deposits observed at a deposit address.
   * Optional: delete this override if {{NAME}} does not expose pull-based history.
   *
   * @param {string} address - The deposit address to list transfers for.
   * @param {SdaTransfersOptions} [options] - Optional pagination/filtering.
   * @returns {Promise<SdaTransfer[]>} The transfers for the address.
   */
  async getTransfers (address, options) {
    // TODO: Implement {{NAME}} transfer history fetching (or delete if unsupported)
  }

  /**
   * Lists transfers aggregated by recipient across all of that recipient's deposit
   * addresses and source chains.
   * Optional: delete this override if {{NAME}} does not expose recipient-keyed history.
   *
   * @param {string | number} destinationChain - The destination chain the transfers are delivered to.
   * @param {string} recipient - The recipient (destination) address.
   * @param {SdaTransfersOptions} [options] - Optional pagination/filtering.
   * @returns {Promise<SdaTransfer[]>} The transfers routed to the recipient.
   */
  async getTransfersByRecipient (destinationChain, recipient, options) {
    // TODO: Implement {{NAME}} recipient-keyed history (or delete if unsupported)
  }

  /**
   * Retrieves a single transfer by its identifier.
   * Optional: delete this override if {{NAME}} does not expose status-by-transfer-id.
   *
   * @param {string} id - The transfer identifier.
   * @returns {Promise<SdaTransfer>} The transfer's current status.
   * @throws {NoSuchElementError} If no such transfer exists.
   */
  async getTransfer (id) {
    // TODO: Implement {{NAME}} transfer status fetching (or delete if unsupported)
  }

  /**
   * Recovers a deposit or address that was not picked up automatically.
   * Optional: delete this override if {{NAME}} does not support recovery.
   *
   * @param {SdaRecoveryOptions} options - The recovery options.
   * @returns {Promise<SdaRecoveryResult>} The recovery outcome.
   */
  async recoverDepositAddress (options) {
    // TODO: Implement {{NAME}} reindex/reactivate recovery (or delete if unsupported)
  }

  /**
   * Disables a deposit address so it no longer accepts deposits.
   * Optional: delete this override if {{NAME}} does not support disabling addresses.
   *
   * @param {string} id - The deposit-address identifier returned in `SdaDepositAddress.id`.
   * @returns {Promise<void>} Resolves once the address has been disabled.
   */
  async disableDepositAddress (id) {
    // TODO: Implement {{NAME}} address disabling (or delete if unsupported)
  }
}
