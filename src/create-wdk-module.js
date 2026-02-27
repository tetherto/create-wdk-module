// Copyright 2024 Tether Operations Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict'

import path from 'path'
import { fileURLToPath } from 'url'

import ora from 'ora'
import pc from 'picocolors'
import { compileTemplate } from './compile-template.js'
import { gitInit, getGitAuthor, isGitAvailable } from './utilities/git.js'

/**
 * @typedef {'wallet' | 'swap' | 'bridge' | 'lending' | 'fiat'} ModuleType
 */

/**
 * @typedef {CreateWdkModuleCommonOptions & (CreateWdkModuleWalletOptions | CreateWdkModuleProtocolOptions | CreateWdkModuleFiatProviderOptions)} CreateWdkModuleOptions
 */

/**
 * @typedef {Object} CreateWdkModuleCommonOptions
 * @property {string} [scope] - The npm scope.
 * @property {boolean} [git] - Whether to initialize a git repository (default: false).
 */

/**
 * @typedef {Object} CreateWdkModuleWalletOptions
 * @property {'wallet'} type - The module type to create.
 * @property {string} name - The wallet's name.
 */

/**
 * @typedef {Object} CreateWdkModuleProtocolOptions
 * @property {'swap' | 'bridge' | 'lending'} type - The module type to create.
 * @property {string} name - The protocol's name.
 * @property {string} blockchain - The target blockchain.
 */

/**
 * @typedef {Object} CreateWdkModuleFiatProviderOptions
 * @property {'fiat'} type - The module type to create.
 * @property {string} name - The fiat provider's name.
 */

const ROOT_DIR = path.dirname(fileURLToPath(import.meta.url))

const TEMPLATES_DIR = path.resolve(ROOT_DIR, '../templates')

/**
 * Generates a full package name from module options.
 *
 * @param {Omit<CreateWdkModuleOptions, 'git'>} options - The module options.
 * @returns {string} The package name.
 */
function generatePackageName ({ type, name, blockchain, scope }) {
  let packageName

  switch (type) {
    case 'wallet':
      packageName = `wdk-wallet-${name}`
      break

    case 'swap':
    case 'bridge':
    case 'lending':
      packageName = `wdk-protocol-${type}-${name}-${blockchain}`
      break

    case 'fiat':
      packageName = `wdk-protocol-fiat-${name}`
      break
  }

  if (scope) {
    packageName = `${scope}/${packageName}`
  }

  return packageName
}

/**
 * Generates a human-readable description for the module.
 *
 * @param {ModuleType} type The module type.
 * @param {Pick<CreateWdkModuleOptions, 'name' | 'blockchain'} options - The module options.
 * @returns {string} The description.
 */
function generateDescription (type, { name, blockchain }) {
  switch (type) {
    case 'wallet':
      return `WDK module to create and manage BIP-32 wallets for the ${name} blockchain.`

    case 'swap':
    case 'bridge':
    case 'lending':
      return `WDK module to make ${blockchain} BIP-32 wallets interact with the ${name} ${type} protocol.`

    case 'fiat':
      return `WDK module to interact with the ${name} fiat provider.`
  }
}

/**
 * Detects the package manager used to invoke the CLI.
 *
 * @returns {'npm' | 'yarn' | 'pnpm'} The detected package manager.
 */
function detectPackageManager () {
  const userAgent = process.env.npm_config_user_agent

  if (!userAgent || userAgent.startsWith('npm')) {
    return 'npm'
  }
  else if (userAgent.startsWith('yarn')) {
    return 'yarn'
  }
  else if (userAgent.startsWith('pnpm')) {
    return 'pnpm'
  }
}

/**
 * Returns the install command string for the given package manager.
 *
 * @param {'npm' | 'yarn' | 'pnpm'} packageManager - The package manager.
 * @returns {string} The install command.
 */
function getInstallCommand (packageManager) {
  switch (packageManager) {
    case 'npm':
      return 'npm install'
    case 'yarn':
      return 'yarn'
    case 'pnpm':
      return 'pnpm install'
  }
}

/**
 * Creates a new wallet development kit module from templates.
 *
 * @param {CreateWdkModuleOptions} options - The module options.
 * @returns {Promise<void>}
 */
export async function createWdkModule (options) {
  const { type, name, blockchain, scope, git } = options

  const packageName = generatePackageName(options)

  const moduleName = scope ? packageName.split('/')[1] : packageName

  const targetDir = path.resolve(process.cwd(), moduleName)

  const context = {
    PACKAGE_NAME: packageName,
    MODULE_NAME: moduleName,
    NAME: name,
    BLOCKCHAIN: blockchain,
    DESCRIPTION: generateDescription(type, { name, blockchain }),
    YEAR: new Date().getFullYear().toString(),
    AUTHOR: getGitAuthor(),
    PACKAGE_MANAGER: detectPackageManager()
  }

  console.log(pc.dim(`Creating ${pc.bold(packageName)}...\n`))

  const templateSpinner = ora('Copying template files...').start()

  try {
    for (const template of ['common', type]) {
      const templateDir = path.join(TEMPLATES_DIR, template)

      await compileTemplate({ templateDir, targetDir, context })
    }

    templateSpinner.succeed('Template files copied')
  } catch (error) {
    templateSpinner.fail('Failed to copy template files')

    throw error
  }

  if (git && isGitAvailable()) {
    const gitSpinner = ora('Initializing git repository...').start()

    try {
      gitInit(targetDir)

      gitSpinner.succeed('Git repository initialized')
    } catch {
      gitSpinner.warn('Failed to initialize git repository')
    }
  }

  console.log()
  console.log(pc.green(pc.bold('Success!')), `Created ${pc.bold(packageName)} at ${pc.dim(`./${moduleName}`)}`)
  console.log()
  console.log('Next steps:')
  console.log(pc.dim(`  cd ${moduleName}`))
  console.log(pc.dim(`  ${getInstallCommand(context.PACKAGE_MANAGER)}`))
  console.log(pc.dim('  npm test'))
  console.log()
  console.log(pc.dim('Base interfaces: https://github.com/tetherto/wdk-wallet'))
  console.log(pc.dim('Documentation: https://docs.wallet.tether.io/sdk/wallet-modules'))
  console.log()
}
