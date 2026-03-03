/** @implements {IWalletAccount} */
export default class WalletAccount{{pascalCase NAME}} extends WalletAccountReadOnly{{pascalCase NAME}} implements IWalletAccount {
    /**
     * Creates a new {{NAME}} wallet account.
     *
     * @param {string | Uint8Array} seed - The wallet's [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) seed.
     * @param {string} path - The BIP-44 derivation path (e.g. "0'/0/0").
     * @param { {{~pascalCase NAME~}}WalletConfig} [config] - The configuration object.
     * @returns {Promise<WalletAccount{{pascalCase NAME}}>} The wallet account.
     */
    static at(seed: string | Uint8Array, path: string, config?: {{pascalCase NAME}}WalletConfig): Promise<WalletAccount{{pascalCase NAME}}>;
    /**
     * Creates a new {{NAME}} wallet account.
     *
     * @private
     * @param {string | Uint8Array} seed - The wallet's [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) seed.
     * @param {string} path - The BIP-44 derivation path (e.g. "0'/0/0").
     * @param { {{~pascalCase NAME~}}WalletConfig} [config] - The configuration object.
     */
    private constructor(seed: string | Uint8Array, path: string, config?: {{pascalCase NAME}}WalletConfig);
    /**
     * The derivation path's index of this account.
     *
     * @type {number}
     */
    get index(): number;
    /**
     * The derivation path of this account.
     *
     * @type {string}
     */
    get path(): string;
    /**
     * The account's key pair.
     *
     * @type {KeyPair}
     */
    get keyPair(): KeyPair;
    /**
     * Signs a message.
     *
     * @param {string} message - The message to sign.
     * @returns {Promise<string>} The message's signature.
     */
    sign(message: string): Promise<string>;
    /**
     * Sends a transaction.
     *
     * @param { {{~pascalCase NAME~}}Transaction} tx - The transaction.
     * @returns {Promise<TransactionResult>} The transaction's result.
     */
    sendTransaction(tx: {{pascalCase NAME}}Transaction): Promise<TransactionResult>;
    /**
     * Transfers a token to another address.
     *
     * @param {TransferOptions} options - The transfer's options.
     * @returns {Promise<TransferResult>} The transfer's result.
     */
    transfer(options: TransferOptions): Promise<TransferResult>;
    /**
     * Returns a read-only copy of the account.
     *
     * @returns {Promise<WalletAccountReadOnly{{pascalCase NAME}}>} The read-only account.
     */
    toReadOnlyAccount(): Promise<WalletAccountReadOnly{{pascalCase NAME}}>;
    /**
     * Disposes the wallet account, erasing the private key from the memory.
     */
    dispose(): void;
}
export type IWalletAccount = import("@tetherto/wdk-wallet").IWalletAccount;
export type KeyPair = import("@tetherto/wdk-wallet").KeyPair;
export type TransactionResult = import("@tetherto/wdk-wallet").TransactionResult;
export type TransferOptions = import("@tetherto/wdk-wallet").TransferOptions;
export type TransferResult = import("@tetherto/wdk-wallet").TransferResult;
export type {{pascalCase NAME}}Transaction = import("./wallet-account-read-only-{{NAME}}.js").{{pascalCase NAME}}Transaction;
export type {{pascalCase NAME}}WalletConfig = import("./wallet-account-read-only-{{NAME}}.js").{{pascalCase NAME}}WalletConfig;
import WalletAccountReadOnly{{pascalCase NAME}} from './wallet-account-read-only-{{NAME}}.js';
