export default class {{pascalCase NAME}}Protocol{{pascalCase BLOCKCHAIN}} extends LendingProtocol {
    /**
     * Creates a new read-only interface to the {{NAME}} protocol for the {{BLOCKCHAIN}} blockchain.
     *
     * @overload
     * @param {IWalletAccountReadOnly} account - The wallet account to use to interact with the protocol.
     */
    constructor(account: IWalletAccountReadOnly);
    /**
     * Creates a new interface to the {{NAME}} protocol for the {{BLOCKCHAIN}} blockchain.
     *
     * @overload
     * @param {IWalletAccount} account - The wallet account to use to interact with the protocol.
     */
    constructor(account: IWalletAccount);
    /**
     * Supplies a specific token amount to the lending pool.
     *
     * @param {SupplyOptions} options - The supply's options.
     * @returns {Promise<SupplyResult>} The supply's result.
     */
    supply(options: SupplyOptions): Promise<SupplyResult>;
    /**
     * Quotes the costs of a supply operation.
     *
     * @param {SupplyOptions} options - The supply's options.
     * @returns {Promise<Omit<SupplyResult, 'hash'>>} The supply's quotes.
     */
    quoteSupply(options: SupplyOptions): Promise<Omit<SupplyResult, "hash">>;
    /**
     * Withdraws a specific token amount from the pool.
     *
     * @param {WithdrawOptions} options - The withdraw's options.
     * @returns {Promise<WithdrawResult>} The withdraw's result.
     */
    withdraw(options: WithdrawOptions): Promise<WithdrawResult>;
    /**
     * Quotes the costs of a withdraw operation.
     *
     * @param {WithdrawOptions} options - The withdraw's options.
     * @returns {Promise<Omit<WithdrawResult, 'hash'>>} The withdraw's quotes.
     */
    quoteWithdraw(options: WithdrawOptions): Promise<Omit<WithdrawResult, "hash">>;
    /**
     * Borrows a specific token amount.
     *
     * @param {BorrowOptions} options - The borrow's options.
     * @returns {Promise<BorrowResult>} The borrow's result.
     */
    borrow(options: BorrowOptions): Promise<BorrowResult>;
    /**
     * Quotes the costs of a borrow operation.
     *
     * @param {BorrowOptions} options - The borrow's options.
     * @returns {Promise<Omit<BorrowResult, 'hash'>>} The borrow's quotes.
     */
    quoteBorrow(options: BorrowOptions): Promise<Omit<BorrowResult, "hash">>;
    /**
     * Repays a specific token amount.
     *
     * @param {RepayOptions} options - The borrow's options.
     * @returns {Promise<RepayResult>} The repay's result.
     */
    repay(options: RepayOptions): Promise<RepayResult>;
    /**
     * Quotes the costs of a repay operation.
     *
     * @param {RepayOptions} options - The repay's options.
     * @returns {Promise<Omit<RepayResult, 'hash'>>} The repay's quotes.
     */
    quoteRepay(options: RepayOptions): Promise<Omit<RepayResult, "hash">>;
}
export type IWalletAccount = import("@tetherto/wdk-wallet").IWalletAccount;
export type IWalletAccountReadOnly = import("@tetherto/wdk-wallet").IWalletAccountReadOnly;
export type SupplyOptions = import("@tetherto/wdk-wallet/protocols").SupplyOptions;
export type SupplyResult = import("@tetherto/wdk-wallet/protocols").SupplyResult;
export type WithdrawOptions = import("@tetherto/wdk-wallet/protocols").WithdrawOptions;
export type WithdrawResult = import("@tetherto/wdk-wallet/protocols").WithdrawResult;
export type BorrowOptions = import("@tetherto/wdk-wallet/protocols").BorrowOptions;
export type BorrowResult = import("@tetherto/wdk-wallet/protocols").BorrowResult;
export type RepayOptions = import("@tetherto/wdk-wallet/protocols").RepayOptions;
export type RepayResult = import("@tetherto/wdk-wallet/protocols").RepayResult;
import { LendingProtocol } from '@tetherto/wdk-wallet/protocols';
