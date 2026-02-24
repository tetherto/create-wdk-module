import { afterEach, beforeEach, describe, expect, test } from '@jest/globals'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { createModule } from '../../src/create-module.js'

const SEED_NAME = 'create-wdk-module-integration-'

let outputDir

async function readGeneratedFile (relativePath) {
  return fs.readFile(path.join(outputDir, relativePath), 'utf-8')
}

async function readGeneratedJson (relativePath) {
  return fs.readJson(path.join(outputDir, relativePath))
}

async function fileExists (relativePath) {
  return fs.pathExists(path.join(outputDir, relativePath))
}

describe('create-wdk-module', () => {
  beforeEach(async () => {
    outputDir = await fs.mkdtemp(path.join(os.tmpdir(), SEED_NAME))
    process.chdir(outputDir)
  })

  afterEach(async () => {
    await fs.remove(outputDir)
  })

  describe('wallet module', () => {
    const MODULE_NAME = 'stellar'
    const EXPECTED_PACKAGE_NAME = 'wdk-wallet-stellar'
    const EXPECTED_DESCRIPTION = 'Stellar wallet module for WDK'

    beforeEach(async () => {
      await createModule({ type: 'wallet', name: MODULE_NAME, git: false })
      outputDir = path.join(outputDir, EXPECTED_PACKAGE_NAME)
    })

    test('should generate the correct directory structure with common and wallet-specific files', async () => {
      expect(await fileExists('package.json')).toBe(true)
      expect(await fileExists('index.js')).toBe(true)
      expect(await fileExists('bare.js')).toBe(true)
      expect(await fileExists('LICENSE')).toBe(true)
      expect(await fileExists('tsconfig.json')).toBe(true)
      expect(await fileExists('README.md')).toBe(true)
      expect(await fileExists('src/wallet-manager-stellar.js')).toBe(true)
      expect(await fileExists('src/wallet-account-stellar.js')).toBe(true)
      expect(await fileExists('src/wallet-account-read-only-stellar.js')).toBe(true)
      expect(await fileExists('src/errors.js')).toBe(true)
      expect(await fileExists('types/index.d.ts')).toBe(true)
      expect(await fileExists('tests/wallet-manager-stellar.test.js')).toBe(true)
      expect(await fileExists('tests/wallet-account-stellar.test.js')).toBe(true)
      expect(await fileExists('tests/wallet-account-read-only-stellar.test.js')).toBe(true)
    })

    test('should replace all placeholders in the generated package.json', async () => {
      const pkg = await readGeneratedJson('package.json')

      expect(pkg.name).toBe(EXPECTED_PACKAGE_NAME)
      expect(pkg.description).toBe(EXPECTED_DESCRIPTION)
      expect(pkg.keywords).toContain('stellar')
      expect(pkg.dependencies['@tetherto/wdk-wallet']).toBe('^1.0.0-beta.1')
      expect(pkg.dependencies.bip39).toBe('3.1.0')
    })

    test('should replace class name placeholders in the source files', async () => {
      const walletManager = await readGeneratedFile('src/wallet-manager-stellar.js')

      expect(walletManager).toContain('WalletAccountStellar')
      expect(walletManager).not.toContain('{{CLASS_NAME}}')
      expect(walletManager).not.toContain('{{CLASS_NAME_LOWER}}')
    })

    test('should include the copyright header with the current year in source files', async () => {
      const currentYear = new Date().getFullYear().toString()
      const walletManager = await readGeneratedFile('src/wallet-manager-stellar.js')

      expect(walletManager).toContain(`Copyright ${currentYear}`)
      expect(walletManager).toContain('Licensed under the Apache License, Version 2.0')
    })

    test('should export the wallet classes from the entry point', async () => {
      const index = await readGeneratedFile('index.js')

      expect(index).toContain('wallet-manager-stellar.js')
      expect(index).toContain('WalletAccountReadOnlyStellar')
      expect(index).toContain('WalletAccountStellar')
    })
  })

  describe('swap module', () => {
    const MODULE_NAME = 'jupiter'
    const BLOCKCHAIN = 'solana'
    const EXPECTED_PACKAGE_NAME = 'wdk-protocol-swap-jupiter-solana'
    const EXPECTED_DESCRIPTION = 'Jupiter swap protocol integration for WDK on solana'

    beforeEach(async () => {
      await createModule({ type: 'swap', name: MODULE_NAME, blockchain: BLOCKCHAIN, git: false })
      outputDir = path.join(outputDir, EXPECTED_PACKAGE_NAME)
    })

    test('should generate the correct directory structure with protocol-specific files', async () => {
      expect(await fileExists('package.json')).toBe(true)
      expect(await fileExists('index.js')).toBe(true)
      expect(await fileExists('bare.js')).toBe(true)
      expect(await fileExists('src/jupiter-provider.js')).toBe(true)
      expect(await fileExists('types/index.d.ts')).toBe(true)
      expect(await fileExists('tests/jupiter-provider.test.js')).toBe(true)
    })

    test('should replace all placeholders in the generated package.json', async () => {
      const pkg = await readGeneratedJson('package.json')

      expect(pkg.name).toBe(EXPECTED_PACKAGE_NAME)
      expect(pkg.description).toBe(EXPECTED_DESCRIPTION)
      expect(pkg.keywords).toEqual(['wdk', 'swap', 'dex', 'defi', 'solana'])
    })

    test('should replace class name placeholders in the provider source file', async () => {
      const provider = await readGeneratedFile('src/jupiter-provider.js')

      expect(provider).toContain('class JupiterProvider')
      expect(provider).not.toContain('{{CLASS_NAME}}')
    })
  })

  describe('bridge module', () => {
    const MODULE_NAME = 'wormhole'
    const BLOCKCHAIN = 'evm'
    const EXPECTED_PACKAGE_NAME = 'wdk-protocol-bridge-wormhole-evm'

    beforeEach(async () => {
      await createModule({ type: 'bridge', name: MODULE_NAME, blockchain: BLOCKCHAIN, git: false })
      outputDir = path.join(outputDir, EXPECTED_PACKAGE_NAME)
    })

    test('should generate the bridge provider with correct class name and description', async () => {
      const pkg = await readGeneratedJson('package.json')
      const provider = await readGeneratedFile('src/wormhole-provider.js')

      expect(pkg.name).toBe(EXPECTED_PACKAGE_NAME)
      expect(pkg.description).toBe('Wormhole bridge protocol integration for WDK on evm')
      expect(provider).toContain('class WormholeProvider')
    })
  })

  describe('lending module', () => {
    const MODULE_NAME = 'compound'
    const BLOCKCHAIN = 'evm'
    const EXPECTED_PACKAGE_NAME = 'wdk-protocol-lending-compound-evm'

    beforeEach(async () => {
      await createModule({ type: 'lending', name: MODULE_NAME, blockchain: BLOCKCHAIN, git: false })
      outputDir = path.join(outputDir, EXPECTED_PACKAGE_NAME)
    })

    test('should generate the lending provider with correct class name and description', async () => {
      const pkg = await readGeneratedJson('package.json')
      const provider = await readGeneratedFile('src/compound-provider.js')

      expect(pkg.name).toBe(EXPECTED_PACKAGE_NAME)
      expect(pkg.description).toBe('Compound lending protocol integration for WDK on evm')
      expect(provider).toContain('class CompoundProvider')
    })
  })

  describe('fiat module', () => {
    const MODULE_NAME = 'moonpay'
    const EXPECTED_PACKAGE_NAME = 'wdk-protocol-fiat-moonpay'
    const EXPECTED_DESCRIPTION = 'Moonpay fiat on/off-ramp integration for WDK'

    beforeEach(async () => {
      await createModule({ type: 'fiat', name: MODULE_NAME, git: false })
      outputDir = path.join(outputDir, EXPECTED_PACKAGE_NAME)
    })

    test('should generate the fiat provider without a blockchain keyword', async () => {
      const pkg = await readGeneratedJson('package.json')

      expect(pkg.name).toBe(EXPECTED_PACKAGE_NAME)
      expect(pkg.description).toBe(EXPECTED_DESCRIPTION)
      expect(pkg.keywords).toEqual(['wdk', 'fiat', 'on-ramp', 'off-ramp'])
    })

    test('should generate the fiat provider with correct class name', async () => {
      const provider = await readGeneratedFile('src/moonpay-provider.js')

      expect(provider).toContain('class MoonpayProvider')
      expect(provider).not.toContain('{{CLASS_NAME}}')
    })
  })

  describe('scoped module', () => {
    const MODULE_NAME = 'stellar'
    const SCOPE = '@tetherto'
    const EXPECTED_DIR_NAME = 'wdk-wallet-stellar'
    const EXPECTED_PACKAGE_NAME = '@tetherto/wdk-wallet-stellar'

    beforeEach(async () => {
      await createModule({ type: 'wallet', name: MODULE_NAME, scope: SCOPE, git: false })
      outputDir = path.join(outputDir, EXPECTED_DIR_NAME)
    })

    test('should set the scoped package name in package.json without scope in the directory name', async () => {
      const pkg = await readGeneratedJson('package.json')

      expect(pkg.name).toBe(EXPECTED_PACKAGE_NAME)
      expect(await fileExists('../' + EXPECTED_DIR_NAME)).toBe(true)
    })
  })

  describe('git initialization', () => {
    test('should initialize a git repository with an initial commit when git is enabled', async () => {
      await createModule({ type: 'wallet', name: 'gittest', git: true })
      const moduleDir = path.join(outputDir, 'wdk-wallet-gittest')

      expect(await fileExists('wdk-wallet-gittest/.git')).toBe(true)

      const HEAD = await fs.readFile(path.join(moduleDir, '.git', 'HEAD'), 'utf-8')
      expect(HEAD).toContain('refs/heads/')
    })

    test('should not create a .git directory when git is disabled', async () => {
      await createModule({ type: 'wallet', name: 'nogittest', git: false })

      expect(await fileExists('wdk-wallet-nogittest/.git')).toBe(false)
    })
  })

  describe('placeholder completeness', () => {
    beforeEach(async () => {
      await createModule({ type: 'swap', name: 'jupiter', blockchain: 'solana', git: false })
      outputDir = path.join(outputDir, 'wdk-protocol-swap-jupiter-solana')
    })

    test('should not leave any unreplaced placeholders in any generated file', async () => {
      const PLACEHOLDER_PATTERN = /\{\{[A-Z_]+\}\}/

      const files = await getAllTextFiles(outputDir)
      const violations = []

      for (const file of files) {
        const content = await fs.readFile(file, 'utf-8')
        const match = content.match(PLACEHOLDER_PATTERN)
        if (match) {
          violations.push({ file: path.relative(outputDir, file), placeholder: match[0] })
        }
      }

      expect(violations).toEqual([])
    })
  })
})

async function getAllTextFiles (dir) {
  const BINARY_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.eot']
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name !== '.git' && entry.name !== 'node_modules') {
        files.push(...await getAllTextFiles(fullPath))
      }
    } else if (!BINARY_EXTENSIONS.some(ext => entry.name.endsWith(ext))) {
      files.push(fullPath)
    }
  }

  return files
}
