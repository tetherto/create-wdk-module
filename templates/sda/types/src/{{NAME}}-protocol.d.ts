export default class {{pascalCase NAME}}Protocol extends SdaProtocol {
    /**
     * Creates a new {{NAME}} SDA protocol without binding it to a wallet account.
     *
     * @overload
     * @param {undefined} [account] - The wallet account to use to interact with the protocol.
     * @param { {{~pascalCase NAME~}}ProtocolConfig} [config] - The {{NAME}} protocol configuration.
     */
    constructor(account?: undefined, config?: {{pascalCase NAME}}ProtocolConfig);
    /**
     * Creates a new read-only {{NAME}} SDA protocol.
     *
     * @overload
     * @param {IWalletAccountReadOnly} account - The wallet account to use to interact with the protocol.
     * @param { {{~pascalCase NAME~}}ProtocolConfig} [config] - The {{NAME}} protocol configuration.
     */
    constructor(account: IWalletAccountReadOnly, config?: {{pascalCase NAME}}ProtocolConfig);
    /**
     * Creates a new {{NAME}} SDA protocol.
     *
     * @overload
     * @param {IWalletAccount} account - The wallet account to use to interact with the protocol.
     * @param { {{~pascalCase NAME~}}ProtocolConfig} [config] - The {{NAME}} protocol configuration.
     */
    constructor(account: IWalletAccount, config?: {{pascalCase NAME}}ProtocolConfig);
    /**
     * The {{NAME}} protocol configuration.
     *
     * @protected
     * @type { {{~pascalCase NAME~}}ProtocolConfig}
     */
    protected _config: {{pascalCase NAME}}ProtocolConfig;
    /**
     * Lists the conversion routes {{NAME}} supports.
     *
     * @param {SdaRoutesOptions} [options] - Optional filters for route discovery.
     * @returns {Promise<SdaRoute[]>} The supported routes.
     * @throws {ValueError} If {{NAME}} discovers routes by blockchain pairs and the source or destination blockchain is not set.
     */
    getSupportedRoutes(options?: SdaRoutesOptions): Promise<SdaRoute[]>;
    /**
     * Creates deposit addresses for the given route and destination.
     *
     * @param {SdaCreateDepositAddressOptions} options - The address creation options.
     * @returns {Promise<SdaDepositAddress[]>} The created deposit addresses, one per distinct address.
     * @throws {ValueError} If `destinationAddress` is omitted and no account was bound at construction.
     * @throws {ValueError} If {{NAME}} requires an output asset and none is provided.
     */
    createDepositAddress(options: SdaCreateDepositAddressOptions): Promise<SdaDepositAddress[]>;
    /**
     * Fetches a non-binding quote (estimate) for a deposit — what a given deposit would deliver.
     *
     * @param {SdaDepositOptions} options - The quote options.
     * @returns {Promise<SdaDepositQuote>} The quoted deposit details.
     * @throws {ValueError} If {{NAME}} requires an output asset and none is provided.
     */
    quoteDeposit(options: SdaDepositOptions): Promise<SdaDepositQuote>;
    /**
     * Derives a deposit address client-side, without a protocol call or activation.
     *
     * @param {SdaCreateDepositAddressOptions} options - The same options passed to createDepositAddress.
     * @returns {Promise<string>} The derived deposit address.
     * @throws {ValueError} If `destinationAddress` is omitted and no account was bound at construction.
     */
    deriveDepositAddress(options: SdaCreateDepositAddressOptions): Promise<string>;
    /**
     * Looks up an existing deposit address by its identifier.
     *
     * @param {string} id - The deposit-address identifier returned in `SdaDepositAddress.id`.
     * @returns {Promise<SdaDepositAddress>} The deposit address descriptor.
     * @throws {NoSuchElementError} If no such address exists.
     */
    getDepositAddress(id: string): Promise<SdaDepositAddress>;
    /**
     * Refreshes the activation of a deposit address so {{NAME}} keeps monitoring it.
     *
     * @param {string} id - The deposit-address identifier returned in `SdaDepositAddress.id`.
     * @returns {Promise<SdaDepositAddress>} The refreshed deposit address descriptor.
     */
    renewDepositAddress(id: string): Promise<SdaDepositAddress>;
    /**
     * Lists the deposits observed at a deposit address.
     *
     * @param {string} address - The deposit address to list transfers for.
     * @param {SdaTransfersOptions} [options] - Optional pagination/filtering.
     * @returns {Promise<SdaTransfer[]>} The transfers for the address.
     */
    getTransfers(address: string, options?: SdaTransfersOptions): Promise<SdaTransfer[]>;
    /**
     * Lists transfers aggregated by recipient across all of that recipient's
     * deposit addresses and source chains.
     *
     * @param {string | number} destinationChain - The destination chain the transfers are delivered to.
     * @param {string} recipient - The recipient (destination) address.
     * @param {SdaTransfersOptions} [options] - Optional pagination/filtering.
     * @returns {Promise<SdaTransfer[]>} The transfers routed to the recipient.
     */
    getTransfersByRecipient(destinationChain: string | number, recipient: string, options?: SdaTransfersOptions): Promise<SdaTransfer[]>;
    /**
     * Retrieves a single transfer by its identifier.
     *
     * @param {string} id - The transfer identifier.
     * @returns {Promise<SdaTransfer>} The transfer's current status.
     * @throws {NoSuchElementError} If no such transfer exists.
     */
    getTransfer(id: string): Promise<SdaTransfer>;
    /**
     * Recovers a deposit or address that was not picked up automatically.
     *
     * @param {SdaRecoveryOptions} options - The recovery options.
     * @returns {Promise<SdaRecoveryResult>} The recovery outcome.
     */
    recoverDepositAddress(options: SdaRecoveryOptions): Promise<SdaRecoveryResult>;
    /**
     * Disables a deposit address so it no longer accepts deposits.
     *
     * @param {string} id - The deposit-address identifier returned in `SdaDepositAddress.id`.
     * @returns {Promise<void>} Resolves once the address has been disabled.
     */
    disableDepositAddress(id: string): Promise<void>;
}
export type IWalletAccount = import("@tetherto/wdk-wallet").IWalletAccount;
export type IWalletAccountReadOnly = import("@tetherto/wdk-wallet").IWalletAccountReadOnly;
export type SdaRoutesOptions = import("@tetherto/wdk-wallet/protocols").SdaRoutesOptions;
export type SdaRoute = import("@tetherto/wdk-wallet/protocols").SdaRoute;
export type SdaDepositOptions = import("@tetherto/wdk-wallet/protocols").SdaDepositOptions;
export type SdaDepositQuote = import("@tetherto/wdk-wallet/protocols").SdaDepositQuote;
export type SdaCreateDepositAddressOptions = import("@tetherto/wdk-wallet/protocols").SdaCreateDepositAddressOptions;
export type SdaDepositAddress = import("@tetherto/wdk-wallet/protocols").SdaDepositAddress;
export type SdaTransfersOptions = import("@tetherto/wdk-wallet/protocols").SdaTransfersOptions;
export type SdaTransfer = import("@tetherto/wdk-wallet/protocols").SdaTransfer;
export type SdaRecoveryOptions = import("@tetherto/wdk-wallet/protocols").SdaRecoveryOptions;
export type SdaRecoveryResult = import("@tetherto/wdk-wallet/protocols").SdaRecoveryResult;
export type {{pascalCase NAME}}ProtocolConfig = {
    /**
     * - Overrides the {{NAME}} API base URL.
     */
    apiUrl?: string;
    /**
     * - The {{NAME}} API key, when required.
     */
    apiKey?: string;
};
import { SdaProtocol } from '@tetherto/wdk-wallet/protocols';
