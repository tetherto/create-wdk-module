# {{PACKAGE_NAME}}

{{DESCRIPTION}}

## Installation

```bash
npm install {{PACKAGE_NAME}}
```

## Usage

```javascript
import WalletManager{{pascalCase NAME}} from '{{PACKAGE_NAME}}'

// Create wallet from mnemonic
const wallet = new WalletManager{{pascalCase NAME}}('your twelve word mnemonic phrase here ...')

// Get an account
const account = await wallet.getAccount(0)

// Get the address
const address = await account.getAddress()
console.log('Address:', address)

// Get balance
const balance = await account.getBalance()
console.log('Balance:', balance)

// Sign a message
const signature = await account.sign('Hello, World!')
console.log('Signature:', signature)

// Clean up
wallet.dispose()
```

## API Reference

### WalletManager{{pascalCase NAME}}

#### Constructor

```javascript
new WalletManager{{pascalCase NAME}}(seed, config?)
```

- `seed` - BIP-39 mnemonic phrase or seed bytes
- `config` - Optional configuration object
  - `transferMaxFee` - Maximum allowed transaction fee

#### Methods

- `getAccount(index?)` - Get account at specified index (default: 0)
- `getAccountByPath(path)` - Get account at custom derivation path
- `getFeeRates()` - Get current network fee rates
- `dispose()` - Clean up and dispose all accounts

### WalletAccount{{pascalCase NAME}}

#### Properties

- `index` - Account index
- `path` - Full derivation path
- `keyPair` - Public and private key pair

#### Methods

- `getAddress()` - Get account address
- `getBalance()` - Get native token balance
- `getTokenBalance(tokenAddress)` - Get token balance
- `sendTransaction(tx)` - Send a transaction
- `transfer(options)` - Transfer tokens
- `sign(message)` - Sign a message
- `verify(message, signature)` - Verify a signature
- `toReadOnlyAccount()` - Create read-only copy
- `dispose()` - Clean up sensitive data

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run linter
npm run lint

# Build types
npm run build:types
```

## License

Apache-2.0
