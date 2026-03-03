# {{PACKAGE_NAME}}

{{DESCRIPTION}}

## Installation

```bash
npm install {{PACKAGE_NAME}}
```

## Usage

```javascript
import {{pascalCase NAME}}Protocol from '{{PACKAGE_NAME}}'

// Create fiat provider (account is optional for quotes)
const fiatProtocol = new {{pascalCase NAME}}Protocol(undefined, {
  apiKey: 'your-api-key'
})

// Get supported assets
const cryptoAssets = await fiatProtocol.getSupportedCryptoAssets()
const fiatCurrencies = await fiatProtocol.getSupportedFiatCurrencies()
const countries = await fiatProtocol.getSupportedCountries()

// Get a buy quote
const buyQuote = await fiatProtocol.quoteBuy({
  cryptoAsset: 'btc',
  fiatCurrency: 'USD',
  fiatAmount: 10000n // $100.00 in cents
})

console.log('Buy quote:', buyQuote)

// Generate buy URL (with wallet account for recipient address)
const buyResult = await fiatProtocol.buy({
  cryptoAsset: 'btc',
  fiatCurrency: 'USD',
  fiatAmount: 10000n,
  recipient: '0x...' // optional, defaults to account address
})

console.log('Buy URL:', buyResult.buyUrl)
```

## API Reference

### {{pascalCase NAME}}Protocol

#### Constructor

```javascript
new {{pascalCase NAME}}Protocol(account?)
```

- `account` - Wallet account (optional, used for default recipient/refund addresses)

#### Methods

- `quoteBuy(options)` - Get a buy quote
- `buy(options)` - Generate buy widget URL
- `quoteSell(options)` - Get a sell quote
- `sell(options)` - Generate sell widget URL
- `getTransactionDetail(txId)` - Get transaction status
- `getSupportedCryptoAssets()` - List supported crypto assets
- `getSupportedFiatCurrencies()` - List supported fiat currencies
- `getSupportedCountries()` - List supported countries

## Development

```bash
npm install
npm test
npm run lint
```

## License

Apache-2.0
