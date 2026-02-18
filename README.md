# create-wdk-module

Create WDK (Wallet Development Kit) modules with a single command.

https://github.com/user-attachments/assets/e342eeef-1e45-4ac0-bd16-bb5cdd63d501

## Quick Start

```bash
npx create-wdk-module@latest
```

Or with specific options:

```bash
# Create a wallet module
npx create-wdk-module@latest wallet stellar

# Create a swap protocol module
npx create-wdk-module@latest swap jupiter solana

# Create with npm scope
npx create-wdk-module@latest wallet stellar --scope @myorg
```

## Module Types

| Type | Description | Example |
|------|-------------|---------|
| `wallet` | Blockchain wallet integration | `wdk-wallet-stellar` |
| `swap` | DEX/token swap protocol | `wdk-protocol-swap-jupiter-solana` |
| `bridge` | Cross-chain bridge protocol | `wdk-protocol-bridge-wormhole-evm` |
| `lending` | DeFi lending protocol | `wdk-protocol-lending-compound-evm` |
| `fiat` | Fiat on/off-ramp provider | `wdk-protocol-fiat-moonpay` |

## CLI Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `[type]` | | Module type | (prompt) |
| `[name]` | | Module/protocol name | (prompt) |
| `[blockchain]` | | Target blockchain | (prompt) |
| `--scope <scope>` | `-s` | npm scope (e.g., @myorg) | none |
| `--git` | | Initialize git repository | true |
| `--no-git` | | Skip git initialization | |
| `--yes` | `-y` | Skip prompts, use defaults | false |
| `--version` | `-v` | Show version | |
| `--help` | `-h` | Show help | |

## Interactive Mode

When run without arguments, the CLI guides you through the setup:

```bash
$ npx create-wdk-module@latest

  Create WDK Module

? What type of module do you want to create?
  > Wallet Module (blockchain wallet integration)
    Swap Module (DEX/token swap integration)
    Bridge Module (cross-chain bridging)
    Lending Module (DeFi lending protocol)
    Fiat Module (fiat on/off-ramp)

? What is the blockchain name? (e.g., "stellar", "solana")
  > stellar

? npm scope (leave empty for none, e.g., @myorg):
  >

? Initialize git repository?
  > Yes

Creating wdk-wallet-stellar...

✓ Copied common files
✓ Copied template files
✓ Initialized git repository

Success! Created wdk-wallet-stellar at ./wdk-wallet-stellar

Next steps:
  cd wdk-wallet-stellar
  npm install
  npm test

Documentation: https://docs.wallet.tether.io/sdk/wallet-modules
Base interfaces: https://github.com/tetherto/wdk-wallet
```

## Generated Project Structure

### Wallet Module

```
wdk-wallet-stellar/
├── .github/
│   └── workflows/
│       └── build.yml
├── src/
│   ├── errors.js
│   ├── wallet-manager-stellar.js
│   ├── wallet-account-stellar.js
│   └── wallet-account-read-only-stellar.js
├── tests/
│   └── *.test.js
├── types/
│   └── index.d.ts
├── .editorconfig
├── .gitignore
├── .npmignore
├── bare.js
├── index.js
├── LICENSE
├── package.json
├── README.md
└── tsconfig.json
```

### Protocol Modules

Protocol modules (swap, bridge, lending, fiat) follow a similar structure with a single provider file:

```
wdk-protocol-swap-jupiter-solana/
├── src/
│   └── jupiter-provider.js
├── tests/
│   └── jupiter-provider.test.js
├── types/
│   └── index.d.ts
├── ...
```

## Development

```bash
# Clone the repository
git clone https://github.com/tetherto/create-wdk-module.git
cd create-wdk-module

# Install dependencies
npm install

# Build
npm run build

# Run locally
node dist/index.js

# Run tests
npm test
```

## Resources

- [WDK Documentation](https://docs.wallet.tether.io)
- [wdk-wallet](https://github.com/tetherto/wdk-wallet) - Base interfaces
- [wdk-wallet-solana](https://github.com/tetherto/wdk-wallet-solana) - Reference implementation

## License

Apache-2.0
