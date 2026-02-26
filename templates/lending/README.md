# {{PACKAGE_NAME}}

{{DESCRIPTION}}

## Installation

```bash
npm install {{PACKAGE_NAME}}
```

## Usage

```javascript
import {{CLASS_NAME}}Provider from '{{PACKAGE_NAME}}'
import WalletManager from '@tetherto/wdk-wallet-{{BLOCKCHAIN}}'

// Create wallet and get account
const wallet = new WalletManager('your mnemonic...')
const account = await wallet.getAccount()

// Create lending provider
const lendingProvider = new {{CLASS_NAME}}Provider(account, {
  poolAddress: 'POOL_CONTRACT_ADDRESS'
})

// Supply tokens
const supplyResult = await lendingProvider.supply({
  token: 'USDT_ADDRESS',
  amount: 1000000n
})

// Borrow tokens
const borrowResult = await lendingProvider.borrow({
  token: 'USDC_ADDRESS',
  amount: 500000n
})

// Repay borrowed tokens
const repayResult = await lendingProvider.repay({
  token: 'USDC_ADDRESS',
  amount: 500000n
})

// Withdraw supplied tokens
const withdrawResult = await lendingProvider.withdraw({
  token: 'USDT_ADDRESS',
  amount: 1000000n
})
```

## API Reference

### {{CLASS_NAME}}Provider

#### Constructor

```javascript
new {{CLASS_NAME}}Provider(account, config?)
```

- `account` - Wallet account (full or read-only)
- `config` - Optional configuration
  - `poolAddress` - Lending pool contract address

#### Methods

- `supply(options)` - Supply tokens to the pool
- `quoteSupply(options)` - Get quote for supply
- `withdraw(options)` - Withdraw tokens from the pool
- `quoteWithdraw(options)` - Get quote for withdrawal
- `borrow(options)` - Borrow tokens
- `quoteBorrow(options)` - Get quote for borrowing
- `repay(options)` - Repay borrowed tokens
- `quoteRepay(options)` - Get quote for repayment

## Development

```bash
npm install
npm test
npm run lint
```

## License

Apache-2.0
