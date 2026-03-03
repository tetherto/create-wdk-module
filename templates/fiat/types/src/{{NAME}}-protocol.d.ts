export default class {{pascalCase NAME}}Protocol extends FiatProtocol {
    /**
     * Creates a new interface to interact with the {{NAME}} protocol without binding it to a wallet account.
     *
     * @overload
     * @param {undefined} [account] - The wallet account to use to interact with the protocol.
     */
    constructor(account?: undefined);
    /**
     * Creates a new read-only interface to interact with the {{NAME}} protocol.
     *
     * @overload
     * @param {IWalletAccountReadOnly} account - The wallet account to use to interact with the protocol.
     */
    constructor(account: IWalletAccountReadOnly);
    /**
     * Creates a new interface to interact with the {{NAME}} protocol.
     *
     * @overload
     * @param {IWalletAccount} account - The wallet account to use to interact with the protocol.
     */
    constructor(account: IWalletAccount);
    /**
     * Generates a URL for a user to purchase a crypto asset with fiat currency.
     *
     * @param {BuyOptions} options - The options for the buy operation.
     * @returns {Promise<BuyResult>} The URL for the user to complete the purchase.
     */
    buy(options: BuyOptions): Promise<BuyResult>;
    /**
     * Gets a quote for a crypto asset purchase.
     *
     * @param {Omit<BuyOptions, 'recipient'>} options - The options for the buy operation.
     * @returns {Promise<FiatQuote>} The quote for the transaction.
     */
    quoteBuy(options: Omit<BuyOptions, 'recipient'>): Promise<FiatQuote>;
    /**
     * Generates a URL for a user to sell a crypto asset for fiat currency.
     *
     * @param {SellOptions} options - The options for the sell operation.
     * @returns {Promise<SellResult>} The URL for the user to complete the sale.
     */
    sell(options: SellOptions): Promise<SellResult>;
    /**
     * Gets a quote for a crypto asset sale.
     *
     * @param {Omit<SellOptions, 'refundAddress'>} options - The options for the sell operation.
     * @returns {Promise<FiatQuote>} The quote for the transaction.
     */
    quoteSell(options: Omit<SellOptions, 'refundAddress'>): Promise<FiatQuote>;
    /**
     * Retrieves the details of a specific transaction from the provider.
     *
     * @param {string} txId - The unique identifier of the transaction.
     * @returns {Promise<FiatTransactionDetail>} The transaction details.
     */
    getTransactionDetail(txId: string): Promise<FiatTransactionDetail>;
    /**
     * Retrieves a list of supported crypto assets from the provider.
     *
     * @returns {Promise<SupportedCryptoAsset[]>} An array of supported crypto assets.
     */
    getSupportedCryptoAssets(): Promise<SupportedCryptoAsset[]>;
    /**
     * Retrieves a list of supported fiat currencies from the provider.
     *
     * @returns {Promise<SupportedFiatCurrency[]>} An array of supported fiat currencies.
     */
    getSupportedFiatCurrencies(): Promise<SupportedFiatCurrency[]>;
    /**
     * Retrieves a list of supported countries or regions from the provider.
     *
     * @returns {Promise<SupportedCountry[]>} An array of supported countries.
     */
    getSupportedCountries(): Promise<SupportedCountry[]>;
}
export type IWalletAccount = import("@tetherto/wdk-wallet").IWalletAccount;
export type IWalletAccountReadOnly = import("@tetherto/wdk-wallet").IWalletAccountReadOnly;
export type BuyOptions = import("@tetherto/wdk-wallet/protocols").BuyOptions;
export type BuyResult = import("@tetherto/wdk-wallet/protocols").BuyResult;
export type SellOptions = import("@tetherto/wdk-wallet/protocols").SellOptions;
export type SellResult = import("@tetherto/wdk-wallet/protocols").SellResult;
export type FiatQuote = import("@tetherto/wdk-wallet/protocols").FiatQuote;
export type FiatTransactionDetail = import("@tetherto/wdk-wallet/protocols").FiatTransactionDetail;
export type SupportedCryptoAsset = import("@tetherto/wdk-wallet/protocols").SupportedCryptoAsset;
export type SupportedFiatCurrency = import("@tetherto/wdk-wallet/protocols").SupportedFiatCurrency;
export type SupportedCountry = import("@tetherto/wdk-wallet/protocols").SupportedCountry;
import { FiatProtocol } from '@tetherto/wdk-wallet/protocols';
