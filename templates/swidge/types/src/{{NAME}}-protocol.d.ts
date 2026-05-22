export default class {{pascalCase NAME}}Protocol extends SwidgeProtocol {
    /**
     * Creates a new {{NAME}} swidge protocol without binding it to a wallet account.
     *
     * @overload
     * @param {undefined} [account] - The wallet account to use to interact with the protocol.
     * @param { {{~pascalCase NAME~}}ProtocolConfig} [config] - The {{NAME}} protocol configuration.
     */
    constructor(account?: undefined, config?: {{pascalCase NAME}}ProtocolConfig);
    /**
     * Creates a new read-only {{NAME}} swidge protocol.
     *
     * @overload
     * @param {IWalletAccountReadOnly} account - The wallet account to use to interact with the protocol.
     * @param { {{~pascalCase NAME~}}ProtocolConfig} [config] - The {{NAME}} protocol configuration.
     */
    constructor(account: IWalletAccountReadOnly, config?: {{pascalCase NAME}}ProtocolConfig);
    /**
     * Creates a new {{NAME}} swidge protocol.
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
     * Quotes the estimated costs and output of a swidge operation.
     * Returns a non-binding quote; the actual execution is performed
     * by {@link swidge}.
     *
     * @param {SwidgeOptions} options - The swidge options.
     * @returns {Promise<SwidgeQuote>} The quoted swidge details.
     */
    quoteSwidge(options: SwidgeOptions): Promise<SwidgeQuote>;
    /**
     * Executes a swidge operation.
     *
     * @param {SwidgeOptions} options - The swidge options.
     * @param {SwidgeProtocolConfig} [config] - Optional provider-specific execution configuration.
     * @returns {Promise<SwidgeResult>} The swidge execution result.
     */
    swidge(options: SwidgeOptions, config?: SwidgeProtocolConfig): Promise<SwidgeResult>;
    /**
     * Retrieves the current status of an in-flight swidge.
     *
     * @param {string} id - The swidge execution identifier returned by swidge.
     * @param {SwidgeStatusOptions} [options] - Optional hints to assist provider lookups.
     * @returns {Promise<SwidgeStatusResult>} The current swidge status.
     * @throws {Error} If the id is invalid, or no swidge exists with the given identifier.
     */
    getSwidgeStatus(id: string, options?: SwidgeStatusOptions): Promise<SwidgeStatusResult>;
    /**
     * Retrieves the chains supported by the provider for swidge operations.
     *
     * @returns {Promise<SwidgeSupportedChain[]>} The supported chains.
     */
    getSupportedChains(): Promise<SwidgeSupportedChain[]>;
    /**
     * Retrieves the tokens supported by the provider for swidge operations.
     *
     * @param {SwidgeSupportedTokensOptions} [options] - Optional filters for chain- or route-scoped token discovery.
     * @returns {Promise<SwidgeSupportedToken[]>} The supported tokens.
     */
    getSupportedTokens(options?: SwidgeSupportedTokensOptions): Promise<SwidgeSupportedToken[]>;
}
export type IWalletAccount = import("@tetherto/wdk-wallet").IWalletAccount;
export type IWalletAccountReadOnly = import("@tetherto/wdk-wallet").IWalletAccountReadOnly;
export type SwidgeOptions = import("@tetherto/wdk-wallet/protocols").SwidgeOptions;
export type SwidgeQuote = import("@tetherto/wdk-wallet/protocols").SwidgeQuote;
export type SwidgeResult = import("@tetherto/wdk-wallet/protocols").SwidgeResult;
export type SwidgeProtocolConfig = import("@tetherto/wdk-wallet/protocols").SwidgeProtocolConfig;
export type SwidgeStatusOptions = import("@tetherto/wdk-wallet/protocols").SwidgeStatusOptions;
export type SwidgeStatusResult = import("@tetherto/wdk-wallet/protocols").SwidgeStatusResult;
export type SwidgeSupportedChain = import("@tetherto/wdk-wallet/protocols").SwidgeSupportedChain;
export type SwidgeSupportedToken = import("@tetherto/wdk-wallet/protocols").SwidgeSupportedToken;
export type SwidgeSupportedTokensOptions = import("@tetherto/wdk-wallet/protocols").SwidgeSupportedTokensOptions;
export type {{pascalCase NAME}}ProtocolConfig = {
    /**
     * - The default slippage tolerance as a decimal (e.g., 0.01 for 1%).
     */
    defaultSlippage?: number;
};
import { SwidgeProtocol } from '@tetherto/wdk-wallet/protocols';
