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

import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import pc from 'picocolors'
import ora from 'ora'
import { copyTemplate, copyCommonFiles } from './helpers/copy.js'
import { initGit, getGitAuthor, isGitAvailable } from './helpers/git.js'
import { generatePackageName, toPascalCase } from './helpers/validate.js'
import { detectPackageManager, getInstallCommand } from './helpers/install.js'

/** @typedef {import('./config.js').ModuleType} ModuleType */

/**
 * @typedef {Object} CreateModuleOptions
 * @property {ModuleType} type The module type to create.
 * @property {string} name The module or protocol name.
 * @property {string} [blockchain] The target blockchain.
 * @property {string} [scope] The npm scope.
 * @property {boolean} git Whether to initialize a git repository.
 * @property {boolean} [skipInstall] Whether to skip dependency installation.
 */

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const TEMPLATES_DIR = path.resolve(currentDir, '../templates')

/**
 * Creates a new WDK module from templates.
 *
 * @param {CreateModuleOptions} options The module creation options.
 * @returns {Promise<void>}
 */
export async function createModule (options) {
  const { type, name, blockchain, scope, git } = options

  const packageName = generatePackageName(type, name, blockchain, scope)
  const dirName = scope != null && scope !== ''
    ? packageName.replace(`${scope}/`, '')
    : packageName
  const className = toPascalCase(name)
  const classNameLower = name.toLowerCase()
  const blockchainName = blockchain ?? name

  const context = {
    MODULE_NAME: packageName,
    CLASS_NAME: className,
    CLASS_NAME_LOWER: classNameLower,
    PACKAGE_NAME: dirName,
    BLOCKCHAIN: blockchainName,
    DESCRIPTION: generateDescription(type, className, blockchainName),
    YEAR: new Date().getFullYear().toString(),
    AUTHOR: getGitAuthor()
  }

  const targetDir = path.resolve(process.cwd(), dirName)

  if (await fs.pathExists(targetDir)) {
    console.error(pc.red(`\nDirectory ${dirName} already exists`))
    process.exit(1)
  }

  console.log(pc.dim(`Creating ${pc.bold(packageName)}...\n`))

  const commonSpinner = ora('Copying common files').start()
  try {
    const commonDir = path.join(TEMPLATES_DIR, 'common')
    if (await fs.pathExists(commonDir)) {
      await copyCommonFiles(commonDir, targetDir, context)
      commonSpinner.succeed('Copied common files')
    } else {
      commonSpinner.warn('Common template not found, skipping')
    }
  } catch (error) {
    commonSpinner.fail('Failed to copy common files')
    throw error
  }

  const templateSpinner = ora('Copying template files').start()
  try {
    const templateDir = path.join(TEMPLATES_DIR, type)

    if (!await fs.pathExists(templateDir)) {
      templateSpinner.fail()
      console.error(pc.red(`Template for "${type}" not found at ${templateDir}`))
      process.exit(1)
    }

    await copyTemplate(templateDir, targetDir, context)
    templateSpinner.succeed('Copied template files')
  } catch (error) {
    templateSpinner.fail('Failed to copy template files')
    throw error
  }

  if (git && isGitAvailable()) {
    const gitSpinner = ora('Initializing git repository').start()
    try {
      initGit(targetDir)
      gitSpinner.succeed('Initialized git repository')
    } catch {
      gitSpinner.warn('Failed to initialize git repository')
    }
  }

  console.log()
  console.log(pc.green(pc.bold('Success!')), `Created ${pc.bold(packageName)} at ${pc.dim(`./${dirName}`)}`)
  console.log()
  console.log('Next steps:')
  console.log(pc.dim(`  cd ${dirName}`))
  console.log(pc.dim(`  ${getInstallCommand(detectPackageManager())}`))
  console.log(pc.dim('  npm test'))
  console.log()
  console.log(pc.dim('Documentation: https://docs.wallet.tether.io/sdk/wallet-modules'))
  console.log(pc.dim('Base interfaces: https://github.com/tetherto/wdk-wallet'))
  console.log()
}

/**
 * Generates a human-readable description for the module.
 *
 * @param {string} type The module type.
 * @param {string} className The PascalCase class name.
 * @param {string} blockchain The target blockchain name.
 * @returns {string} The generated description.
 */
function generateDescription (type, className, blockchain) {
  switch (type) {
    case 'wallet':
      return `${className} wallet module for WDK`
    case 'swap':
      return `${className} swap protocol integration for WDK on ${blockchain}`
    case 'bridge':
      return `${className} bridge protocol integration for WDK on ${blockchain}`
    case 'lending':
      return `${className} lending protocol integration for WDK on ${blockchain}`
    case 'fiat':
      return `${className} fiat on/off-ramp integration for WDK`
    default:
      return `${className} module for WDK`
  }
}
