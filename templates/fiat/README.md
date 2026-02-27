# {{PACKAGE_NAME}}

{{DESCRIPTION}}

## Installation

```bash
npm install {{PACKAGE_NAME}}
```

## Usage

```javascript
import {{pascalCase NAME}}Provider from '{{PACKAGE_NAME}}'

// Create fiat provider (account is optional for quotes)
const fiatProvider = new {{pascalCase NAME}}Provider(undefined, {
  apiKey: 'your-api-key'
})

// Get supported assets
const cryptoAssets = await fiatProvider.getSupportedCryptoAssets()
const fiatCurrencies = await fiatProvider.getSupportedFiatCurrencies()
const countries = await fiatProvider.getSupportedCountries()

// Get a buy quote
const buyQuote = await fiatProvider.quoteBuy({
  cryptoAsset: 'btc',
  fiatCurrency: 'USD',
  fiatAmount: 10000n // $100.00 in cents
})

console.log('Buy quote:', buyQuote)

// Generate buy URL (with wallet account for recipient address)
const buyResult = await fiatProvider.buy({
  cryptoAsset: 'btc',
  fiatCurrency: 'USD',
  fiatAmount: 10000n,
  recipient: '0x...' // optional, defaults to account address
})

console.log('Buy URL:', buyResult.buyUrl)
```

## API Reference

### {{pascalCase NAME}}Provider

#### Constructor

```javascript
new {{pascalCase NAME}}Provider(account?, config)
```

- `account` - Wallet account (optional, used for default recipient/refund addresses)
- `config` - Configuration (required)
  - `apiKey` - {{pascalCase NAME}} API key (required)
  - `apiUrl` - Custom API endpoint
  - `sandbox` - Use test mode

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
