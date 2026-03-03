# {{PACKAGE_NAME}}

{{DESCRIPTION}}

## Installation

```bash
npm install {{PACKAGE_NAME}}
```

## Usage

```javascript
import {{pascalCase NAME}}Protocol{{pascalCase BLOCKCHAIN}} from '{{PACKAGE_NAME}}'
import WalletManager{{pascalCase BLOCKCHAIN}} from '@tetherto/wdk-wallet-{{BLOCKCHAIN}}'

// Create wallet and get account
const wallet = new WalletManager{{pascalCase BLOCKCHAIN}}('your mnemonic...')
const account = await wallet.getAccount()

// Create lending protocol
const lendingProtocol = new {{pascalCase NAME}}Protocol{{pascalCase BLOCKCHAIN}}(account)

// Supply tokens
const supplyResult = await lendingProtocol.supply({
  token: 'USDT_ADDRESS',
  amount: 1000000n
})

// Borrow tokens
const borrowResult = await lendingProtocol.borrow({
  token: 'USDC_ADDRESS',
  amount: 500000n
})

// Repay borrowed tokens
const repayResult = await lendingProtocol.repay({
  token: 'USDC_ADDRESS',
  amount: 500000n
})

// Withdraw supplied tokens
const withdrawResult = await lendingProtocol.withdraw({
  token: 'USDT_ADDRESS',
  amount: 1000000n
})
```

## API Reference

### {{pascalCase NAME}}Protocol{{pascalCase BLOCKCHAIN}}

#### Constructor

```javascript
new {{pascalCase NAME}}Protocol{{pascalCase BLOCKCHAIN}}(account, config?)
```

- `account` - Wallet account (full or read-only)

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
