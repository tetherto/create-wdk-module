export default class WalletManager{{pascalCase NAME}} extends WalletManager {
    /**
     * Creates a new wallet manager for the {{NAME}} blockchain.
     *
     * @param {string | Uint8Array} seed - The wallet's [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) seed phrase.
   * @param { {{~pascalCase NAME~}}WalletConfig} [config] - The configuration object.
     */
    constructor(seed: string | Uint8Array, config?: {{pascalCase NAME}}WalletConfig);
    /**
     * The {{NAME}} wallet configuration. 
     *
     * @protected
     * @type { {{~pascalCase NAME~}}WalletConfig}
     */
    protected _config: {{pascalCase NAME}}WalletConfig;
    /**
     * Returns the wallet account at a specific index (see [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)).
     *
     * @param {number} [index] - The index of the account to get (default: 0).
     * @returns {Promise<WalletAccount{{pascalCase NAME}}>} The account.
     */
    getAccount(index?: number): Promise<WalletAccount{{pascalCase NAME}}>;
    /**
     * Returns the wallet account at a specific BIP-44 derivation path.
     *
     * @param {string} path - The derivation path (e.g. "0'/0/0").
     * @returns {Promise<WalletAccount{{pascalCase NAME}}>} The account.
     */
    getAccountByPath(path: string): Promise<WalletAccount{{pascalCase NAME}}>;
    /**
     * Returns the current fee rates.
     *
     * @returns {Promise<FeeRates>} The fee rates (in base units).
     */
    getFeeRates(): Promise<FeeRates>;
}
export type FeeRates = import("@tetherto/wdk-wallet").FeeRates;
export type {{pascalCase NAME}}WalletConfig = import("./wallet-account-read-only-{{NAME}}.js").{{pascalCase NAME}}WalletConfig;
import WalletManager from '@tetherto/wdk-wallet';
import WalletAccount{{pascalCase NAME}} from './wallet-account-{{NAME}}.js';
