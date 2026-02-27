# {{PACKAGE_NAME}}

{{DESCRIPTION}}

## Installation

```bash
npm install {{PACKAGE_NAME}}
```

## Usage

```javascript
import {{pascalCase NAME}}Provider from '{{PACKAGE_NAME}}'
import WalletManager from '@tetherto/wdk-wallet-{{BLOCKCHAIN}}'

// Create wallet and get account
const wallet = new WalletManager('your mnemonic...')
const account = await wallet.getAccount()

// Create swap provider
const swapProvider = new {{pascalCase NAME}}Provider(account, {
  apiKey: 'your-api-key'
})

// Get a quote
const quote = await swapProvider.quoteSwap({
  tokenIn: 'TOKEN_A_ADDRESS',
  tokenOut: 'TOKEN_B_ADDRESS',
  tokenInAmount: 1000000n // amount in base units
})

console.log('Quote:', quote)

// Execute swap
const result = await swapProvider.swap({
  tokenIn: 'TOKEN_A_ADDRESS',
  tokenOut: 'TOKEN_B_ADDRESS',
  tokenInAmount: 1000000n
})

console.log('Swap result:', result)
```

## API Reference

### {{pascalCase NAME}}Provider

#### Constructor

```javascript
new {{pascalCase NAME}}Provider(account, config?)
```

- `account` - Wallet account (full or read-only)
- `config` - Optional configuration
  - `swapMaxFee` - Maximum allowed swap fee
  - `apiKey` - {{pascalCase NAME}} API key
  - `apiUrl` - Custom API endpoint

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
