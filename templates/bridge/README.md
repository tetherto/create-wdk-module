# {{PACKAGE_NAME}}

{{DESCRIPTION}}

## Installation

```bash
npm install {{PACKAGE_NAME}}
```

## Usage

```javascript
import {{pascalCase NAME}}Protocol from '{{PACKAGE_NAME}}'
import WalletManager{{pascalCase BLOCKCHAIN}} from '@tetherto/wdk-wallet-{{BLOCKCHAIN}}'

// Create wallet and get account
const wallet = new WalletManager{{pascalCase BLOCKCHAIN}}('your mnemonic...')
const account = await wallet.getAccount()

// Create bridge protocol
const bridgeProtocol = new {{pascalCase NAME}}Protocol{{pascalCase BLOCKCHAIN}}(account)

// Get a quote
const quote = await bridgeProtocol.quoteBridge({
  targetChain: 'arbitrum',
  recipient: '0x...',
  token: 'USDT_ADDRESS',
  amount: 1000000n
})

console.log('Quote:', quote)

// Execute bridge
const result = await bridgeProtocol.bridge({
  targetChain: 'arbitrum',
  recipient: '0x...',
  token: 'USDT_ADDRESS',
  amount: 1000000n
})

console.log('Bridge result:', result)
```

## API Reference

### {{pascalCase NAME}}Protocol{{pascalCase BLOCKCHAIN}}

#### Constructor

```javascript
new {{pascalCase NAME}}Protocol{{pascalCase BLOCKCHAIN}}(account, config?)
```

- `account` - Wallet account (full or read-only)
- `config` - Optional configuration
  - `bridgeMaxFee` - Maximum allowed bridge fee

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
