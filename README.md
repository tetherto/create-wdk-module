# create-wdk-module

Create WDK (Wallet Development Kit) modules with a single command.

https://github.com/user-attachments/assets/e342eeef-1e45-4ac0-bd16-bb5cdd63d501

## Quick Start

```bash
npx @tetherto/create-wdk-module@latest
```

Or with specific options:

```bash
# Create a wallet module
npx @tetherto/create-wdk-module@latest wallet stellar

# Create a swap protocol module
npx @tetherto/create-wdk-module@latest swap jupiter solana

# Create with npm scope
npx @tetherto/create-wdk-module@latest wallet stellar --scope @myorg
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
$ npx @tetherto/create-wdk-module@latest

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

✓ Template files copied
✓ Initialized git repository

Success! Created wdk-wallet-stellar at ./wdk-wallet-stellar

Next steps:
  cd wdk-wallet-stellar
  npm install
  npm test

Documentation: https://docs.wallet.tether.io/sdk/wallet-modules
```

## Generated Project Structure

### Wallet Module

```
wdk-wallet-stellar/
├── .github/
│   └── workflows/
│       └── build.yml
│       └── publish.yml
│   └── ISSUE_TEMPLATE/
│       └── general.md
│   └── PULL_REQUEST_TEMPLATE.md
├── src/
│   ├── wallet-manager-stellar.js
│   ├── wallet-account-stellar.js
│   └── wallet-account-read-only-stellar.js
├── tests/
│   └── wallet-manager-stellar.test.js
│   └── wallet-account-stellar.test.js
│   └── wallet-account-read-only-stellar.test.js
├── types/
│   └── index.d.ts
│   └── src/
│       └── wallet-manager-stellar.d.ts
│       └── wallet-account-stellar.d.ts
│       └── wallet-account-read-only-stellar.d.ts
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
│   └── jupiter-protocol-solana.js
├── tests/
│   └── jupiter-protocol-solana.test.js
├── types/
│   └── index.d.ts
│   └── src/
│       └── jupiter-protocol-solana.d.ts
├── ...
```

## Development

```bash
# Clone the repository
git clone https://github.com/tetherto/create-wdk-module.git
cd create-wdk-module

# Install dependencies
npm install

# Run locally
npm start

# Run tests
npm test
```

## Resources

- [WDK Documentation](https://docs.wallet.tether.io)
- [wdk-wallet](https://github.com/tetherto/wdk-wallet) - Base interfaces
- [wdk-wallet-solana](https://github.com/tetherto/wdk-wallet-solana) - Reference implementation

## License

Apache-2.0
