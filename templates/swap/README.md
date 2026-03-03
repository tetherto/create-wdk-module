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

// Create swap protocol
const swapProtocol = new {{pascalCase NAME}}Protocol{{pascalCase BLOCKCHAIN}}(account)

// Get a quote
const quote = await swapProtocol.quoteSwap({
  tokenIn: 'TOKEN_A_ADDRESS',
  tokenOut: 'TOKEN_B_ADDRESS',
  tokenInAmount: 1000000n // amount in base units
})

console.log('Quote:', quote)

// Execute swap
const result = await swapProtocol.swap({
  tokenIn: 'TOKEN_A_ADDRESS',
  tokenOut: 'TOKEN_B_ADDRESS',
  tokenInAmount: 1000000n
})

console.log('Swap result:', result)
```

## API Reference

### {{pascalCase NAME}}Protocol{{pascalCase BLOCKCHAIN}}

#### Constructor

```javascript
new {{pascalCase NAME}}Protocol{{pascalCase BLOCKCHAIN}}(account, config?)
```

- `account` - Wallet account (full or read-only)
- `config` - Optional configuration
  - `swapMaxFee` - Maximum allowed swap fee

#### Methods

- `swap(options)` - Execute a token swap
- `quoteSwap(options)` - Get a quote for a swap

## Development

```bash
npm install
npm test
npm run lint
```

## License

Apache-2.0
