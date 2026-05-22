# {{PACKAGE_NAME}}

{{DESCRIPTION}}

## Installation

```bash
npm install {{PACKAGE_NAME}}
```

## Usage

```javascript
import {{pascalCase NAME}}Protocol from '{{PACKAGE_NAME}}'

// Create swidge protocol (account is optional for quotes)
const swidgeProtocol = new {{pascalCase NAME}}Protocol()

// Discover supported chains and tokens
const chains = await swidgeProtocol.getSupportedChains()
const tokens = await swidgeProtocol.getSupportedTokens({ fromChain: 1 })

// Get a cross-chain swap quote
const quote = await swidgeProtocol.quoteSwidge({
  fromToken: 'USDT',
  toToken: 'USDC',
  toChain: 137,
  fromTokenAmount: 1000000n
})

console.log('Quote:', quote)

// Execute the cross-chain swap
const result = await swidgeProtocol.swidge({
  fromToken: 'USDT',
  toToken: 'USDC',
  toChain: 137,
  fromTokenAmount: 1000000n,
  recipient: '0x...'
})

console.log('Swidge result:', result)

// Track operation status
const status = await swidgeProtocol.getSwidgeStatus(result.id)
console.log('Status:', status)

// Bridge a token to another chain
const bridgeResult = await swidgeProtocol.bridge({
  token: '0x...',
  targetChain: 'polygon',
  amount: 1000000n,
  recipient: '0x...'
})

console.log('Bridge result:', bridgeResult)
```

## API Reference

### {{pascalCase NAME}}Protocol

#### Constructor

```javascript
new {{pascalCase NAME}}Protocol(account?, config?)
```

- `account` - Wallet account (optional, used for default recipient/refund addresses)
- `config` - Protocol configuration (optional)
  - `defaultSlippage` - Default slippage tolerance as a decimal, e.g. `0.01` for 1% (optional)

#### Methods

- `bridge(options)` - Bridge a token to a different blockchain
- `quoteBridge(options)` - Get a bridge quote
- `quoteSwidge(options)` - Get a cross-chain swap quote
- `swidge(options, config?)` - Execute a cross-chain swap
- `getSwidgeStatus(id, options?)` - Get operation status
- `getSupportedChains()` - List supported chains
- `getSupportedTokens(options?)` - List supported tokens

#### Inherited from SwidgeProtocol

- `swap(options)` - Swap tokens (delegates to `swidge`)
- `quoteSwap(options)` - Get a swap quote (delegates to `quoteSwidge`)

## Development

```bash
npm install
npm test
npm run lint
```

## License

Apache-2.0
