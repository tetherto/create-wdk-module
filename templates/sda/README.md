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

// Discover what the provider implements
const capabilities = sda.getCapabilities()

// Discover supported routes (source chains, input tokens, destination assets, limits)
const routes = await sda.getSupportedRoutes({ destinationAsset: 'USDT' })

// Optionally fetch a quote up front (required by some providers)
if (capabilities.quoting) {
  const quote = await sda.quoteDeposit({
    sourceChain: 'arbitrum',
    inputToken: 'USDC',
    destinationChain: 'polygon',
    destinationAsset: 'USDT',
    inputAmount: 1000000n
  })

  console.log('Quote:', quote)
}

// Create a deposit address for the user to send funds to
const deposit = await sda.createDepositAddress({
  sourceChains: ['arbitrum'],
  destinationChain: 'polygon',
  destinationAsset: 'USDT',
  destinationAddress: '0x...'
})

console.log('Send funds to:', deposit.address)

// Track deposits observed at the address
const transfers = await sda.getDepositAddressTransfers(deposit.address)
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
  - `defaultRefundAddress` - Refund address used when a call omits one (optional)

#### Required methods

- `getCapabilities()` - Returns which optional methods this provider implements
- `getSupportedRoutes(options?)` - List supported routes, input tokens and limits
- `createDepositAddress(options)` - Create a deposit address and its descriptor
- `getDepositAddressTransfers(address, options?)` - List deposits seen at an address

#### Optional methods (advertised via `getCapabilities()`)

- `quoteDeposit(options)` - Fetch a non-binding deposit quote
- `getDepositAddress(idOrAddress)` - Look up an existing deposit address
- `getTransferStatus(id)` - Status of a single transfer
- `recoverDepositAddress(options)` - Re-index or reactivate an undetected deposit/address
- `disableDepositAddress(idOrAddress)` - Disable a deposit address

## Development

```bash
npm install
npm test
npm run lint
```

## License

Apache-2.0
