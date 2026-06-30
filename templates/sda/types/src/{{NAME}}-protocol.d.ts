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
     * Returns which optional parts of the interface {{NAME}} implements.
     *
     * @returns {SdaCapabilities} The provider's capabilities.
     */
    getCapabilities(): SdaCapabilities;
    /**
     * Lists the conversion routes {{NAME}} supports.
     *
     * @param {SdaRoutesOptions} [options] - Optional filters for route discovery.
     * @returns {Promise<SdaRoute[]>} The supported routes.
     */
    getSupportedRoutes(options?: SdaRoutesOptions): Promise<SdaRoute[]>;
    /**
     * Fetches a non-binding quote for a deposit.
     *
     * @param {SdaQuoteOptions} options - The quote options.
     * @returns {Promise<SdaQuote>} The quoted deposit details.
     */
    quoteDeposit(options: SdaQuoteOptions): Promise<SdaQuote>;
    /**
     * Creates a deposit address for the given route and destination.
     *
     * @param {SdaCreateOptions} options - The address creation options.
     * @returns {Promise<SdaDepositAddress[]>} The created deposit addresses, one per distinct address.
     */
    createDepositAddress(options: SdaCreateOptions): Promise<SdaDepositAddress[]>;
    /**
     * Looks up an existing deposit address by its identifier or address.
     *
     * @param {string} id - The provider SDA identifier, or the deposit address.
     * @returns {Promise<SdaDepositAddress>} The deposit address descriptor.
     */
    getDepositAddress(id: string): Promise<SdaDepositAddress>;
    /**
     * Lists the deposits observed at a deposit address.
     *
     * @param {string} address - The deposit address to list transfers for.
     * @param {SdaTransfersOptions} [options] - Optional pagination/filtering.
     * @returns {Promise<SdaTransfer[]>} The transfers for the address.
     */
    getDepositAddressTransfers(address: string, options?: SdaTransfersOptions): Promise<SdaTransfer[]>;
    /**
     * Lists transfers aggregated by recipient across all of that recipient's
     * deposit addresses and source chains.
     *
     * @param {string} recipient - The recipient (destination) address.
     * @param {string | number} destinationChain - The destination chain.
     * @param {SdaTransfersOptions} [options] - Optional pagination/filtering.
     * @returns {Promise<SdaTransfer[]>} The transfers routed to the recipient.
     */
    getTransfersByRecipient(recipient: string, destinationChain: string | number, options?: SdaTransfersOptions): Promise<SdaTransfer[]>;
    /**
     * Retrieves the status of a single transfer by its identifier.
     *
     * @param {string} id - The transfer identifier.
     * @returns {Promise<SdaTransfer>} The transfer's current status.
     */
    getTransferStatus(id: string): Promise<SdaTransfer>;
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
     * @param {string} id - The provider SDA identifier, or the deposit address.
     * @returns {Promise<void>}
     */
    disableDepositAddress(id: string): Promise<void>;
}
export type IWalletAccount = import("@tetherto/wdk-wallet").IWalletAccount;
export type IWalletAccountReadOnly = import("@tetherto/wdk-wallet").IWalletAccountReadOnly;
export type SdaCapabilities = import("@tetherto/wdk-wallet/protocols").SdaCapabilities;
export type SdaRoutesOptions = import("@tetherto/wdk-wallet/protocols").SdaRoutesOptions;
export type SdaRoute = import("@tetherto/wdk-wallet/protocols").SdaRoute;
export type SdaQuoteOptions = import("@tetherto/wdk-wallet/protocols").SdaQuoteOptions;
export type SdaQuote = import("@tetherto/wdk-wallet/protocols").SdaQuote;
export type SdaCreateOptions = import("@tetherto/wdk-wallet/protocols").SdaCreateOptions;
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
    /**
     * - Refund address used when a call omits one.
     */
    defaultRefundAddress?: string;
};
import { SdaProtocol } from '@tetherto/wdk-wallet/protocols';
