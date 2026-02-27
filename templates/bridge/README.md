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

// Create bridge provider
const bridgeProvider = new {{pascalCase NAME}}Provider(account, {
  apiKey: 'your-api-key'
})

// Get a quote
const quote = await bridgeProvider.quoteBridge({
  targetChain: 'arbitrum',
  recipient: '0x...',
  token: 'USDT_ADDRESS',
  amount: 1000000n
})

console.log('Quote:', quote)

// Execute bridge
const result = await bridgeProvider.bridge({
  targetChain: 'arbitrum',
  recipient: '0x...',
  token: 'USDT_ADDRESS',
  amount: 1000000n
})

console.log('Bridge result:', result)
```

## API Reference

### {{pascalCase NAME}}Provider

#### Constructor

```javascript
new {{pascalCase NAME}}Provider(account, config?)
```

- `account` - Wallet account (full or read-only)
- `config` - Optional configuration
  - `bridgeMaxFee` - Maximum allowed bridge fee
  - `apiKey` - {{pascalCase NAME}} API key
  - `apiUrl` - Custom API endpoint

#### Methods

- `bridge(options)` - Execute a cross-chain bridge
- `quoteBridge(options)` - Get a quote for a bridge

## Development

```bash
npm install
npm test
npm run lint
```

## License

Apache-2.0
