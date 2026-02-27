export default class {{pascalCase NAME}}Protocol{{pascalCase BLOCKCHAIN}} extends BridgeProtocol {
    /**
     * Creates a new read-only interface to the {{NAME}} protocol for the {{BLOCKCHAIN}} blockchain.
     *
     * @overload
     * @param {IWalletAccountReadOnly} account - The wallet account to use to interact with the protocol.
     * @param {BridgeProtocolConfig} [config] - The bridge protocol configuration.
     */
    constructor(account: IWalletAccountReadOnly, config?: BridgeProtocolConfig);
    /**
     * Creates a new interface to the {{NAME}} protocol for the {{BLOCKCHAIN}} blockchain.
     *
     * @overload
     * @param {IWalletAccount} account - The wallet account to use to interact with the protocol.
     * @param {BridgeProtocolConfig} [config] - The bridge protocol configuration.
     */
    constructor(account: IWalletAccount, config?: BridgeProtocolConfig);
    /**
     * Bridges a token to a different blockchain.
     *
     * @param {BridgeOptions} options - The bridge's options.
     * @returns {Promise<BridgeResult>} The bridge's result.
     */
    bridge(options: BridgeOptions): Promise<BridgeResult>;
    /**
     * Quotes the costs of a bridge operation.
     *
     * @param {BridgeOptions} options - The bridge's options.
     * @returns {Promise<Omit<BridgeResult, 'hash'>>} The bridge's quote.
     */
    quoteBridge(options: BridgeOptions): Promise<Omit<BridgeResult, 'hash'>>;
}
export type IWalletAccount = import("@tetherto/wdk-wallet").IWalletAccount;
export type IWalletAccountReadOnly = import("@tetherto/wdk-wallet").IWalletAccountReadOnly;
export type BridgeProtocolConfig = import("@tetherto/wdk-wallet/protocols").BridgeProtocolConfig;
export type BridgeOptions = import("@tetherto/wdk-wallet/protocols").BridgeOptions;
export type BridgeResult = import("@tetherto/wdk-wallet/protocols").BridgeResult;
import { BridgeProtocol } from '@tetherto/wdk-wallet/protocols';
