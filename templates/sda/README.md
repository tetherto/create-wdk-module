# {{PACKAGE_NAME}}

{{DESCRIPTION}}

A Smart Deposit Address (SDA) module: the provider issues a deposit address, the
user sends a supported stablecoin (or native token) from any supported source
chain, and the provider converts it and delivers the destination asset (e.g.
USDT) to the destination chain and address.

## Installation

```bash
npm install {{PACKAGE_NAME}}
```

## Usage

```javascript
import {{pascalCase NAME}}Protocol from '{{PACKAGE_NAME}}'

// Create the SDA protocol (account is optional; its address is the default destination)
const sda = new {{pascalCase NAME}}Protocol(account, { apiKey: '...' })

// Discover supported routes (source chains, input tokens, output assets, limits)
const routes = await sda.getSupportedRoutes({ outputAsset: 'USDT' })

// Optionally fetch a non-binding quote before funding the address
// (throws UnsupportedOperationError if the provider does not support quoting)
const quote = await sda.quoteDeposit({
  sourceChain: 'arbitrum',
  inputToken: 'USDC',
  destinationChain: 'polygon',
  outputAsset: 'USDT',
  inputAmount: 1000000n
})

console.log('Quote:', quote)

// Create a deposit address for the user to send funds to
const deposit = await sda.createDepositAddress({
  sourceChains: ['arbitrum'],
  destinationChain: 'polygon',
  outputAsset: 'USDT',
  destinationAddress: '0x...'
})

console.log('Send funds to:', deposit.address)

// Track deposits observed at the address
const transfers = await sda.getTransfers(deposit.address)
console.log('Transfers:', transfers)
```

## API Reference

### {{pascalCase NAME}}Protocol

#### Constructor

```javascript
new {{pascalCase NAME}}Protocol(account?, config?)
```

- `account` - Wallet account (optional; its address is the default delivery destination)
- `config` - Protocol configuration (optional)
  - `apiUrl` - Overrides the provider's API base URL (optional)
  - `apiKey` - The provider API key, when required (optional)

#### Required methods

- `getSupportedRoutes(options?)` - List supported routes, input tokens and limits
- `createDepositAddress(options)` - Create a deposit address and its descriptor

#### Optional methods

Delete any your provider does not implement — the base class throws
`UnsupportedOperationError` for those.

- `quoteDeposit(options)` - Fetch a non-binding deposit quote
- `deriveDepositAddress(options)` - Derive a deposit address client-side
- `getDepositAddress(id)` - Look up an existing deposit address
- `renewDepositAddress(id)` - Refresh a time-limited address's activation
- `getTransfers(address, options?)` - List deposits seen at an address
- `getTransfersByRecipient(destinationChain, recipient, options?)` - List transfers by recipient
- `getTransfer(id)` - Retrieve a single transfer
- `recoverDepositAddress(options)` - Re-index or reactivate an undetected deposit/address
- `disableDepositAddress(id)` - Disable a deposit address

## Development

```bash
npm install
npm test
npm run lint
```

## License

Apache-2.0
