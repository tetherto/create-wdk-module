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

import prompts from 'prompts'

import { validateScope, validateModuleName } from './utilities/validation.js'

import { CancelError } from './errors.js'

/** @typedef {import('./create-wdk-module.js').CreateWdkModuleOptions} CreateWdkModuleOptions */

/**
 * Runs interactive prompts to collect missing module creation options.
 *
 * @param {Partial<CreateWdkModuleOptions>} options - The partial options from CLI arguments.
 * @param {boolean} [useDefaults] - If true, uses default values for optional prompts.
 * @returns {Promise<CreateWdkModuleOptions>} The full module options.
 * @throws {CancelError} If the operation is cancelled.
 */
export async function runPrompts (options, useDefaults = false) {
  const questions = []

  if (!options.type) {
    questions.push({
      type: 'select',
      name: 'type',
      message: 'What type of module do you want to create?',
      choices: [
        { title: 'Wallet Module', description: 'Blockchain wallet integration', value: 'wallet' },
        { title: 'Swap Module', description: 'DEX/token swap integration', value: 'swap' },
        { title: 'Bridge Module', description: 'Cross-chain bridging', value: 'bridge' },
        { title: 'Lending Module', description: 'DeFi lending protocol', value: 'lending' },
        { title: 'Fiat Module', description: 'Fiat on/off-ramp', value: 'fiat' }
      ]
    })
  }

  if (!options.name) {
    questions.push({
      type: 'text',
      name: 'name',
      message: (_prev, values) => {
        switch (options.type || values.type) {
          case 'wallet':
            return 'What is the blockchain name? (e.g., "stellar", "solana")'

          case 'swap':
          case 'bridge':
          case 'lending':
            return 'What is the protocol name? (e.g., "jupiter", "wormhole")'

          case 'fiat':
            return 'What is the fiat provider name? (e.g., "moonpay", "ramp")'
        }
      },
      validate: (value) => {
        const { valid, errors } = validateModuleName(value)
        return valid || errors[0]
      }
    })
  }

  if (!options.blockchain) {
    questions.push({
      type: (_prev, values) => {
        return ['swap', 'bridge', 'lending'].includes(options.type || values.type)
          ? 'select'
          : null
      },
      name: 'blockchain',
      message: 'What blockchain does this target?',
      choices: [
        { title: 'EVM (Ethereum, Polygon, etc.)', value: 'evm' },
        { title: 'Solana', value: 'solana' },
        { title: 'Bitcoin', value: 'bitcoin' },
        { title: 'TON', value: 'ton' },
        { title: 'TRON', value: 'tron' },
        { title: 'Other', value: '_other' }
      ]
    })

    questions.push({
      type: (prev) => prev === '_other' ? 'text' : null,
      name: 'blockchainOther',
      message: 'Enter the blockchain name:',
      validate: (value) => {
        const { valid, errors } = validateModuleName(value)
        return valid || errors[0]
      }
    })
  }

  if (options.scope === undefined && !useDefaults) {
    questions.push({
      type: 'text',
      name: 'scope',
      message: 'npm scope (leave empty for none, e.g., @myorg):',
      validate: (value) => {
        if (!value) {
          return true
        }

        const { valid, errors } = validateScope(value)
        return valid || errors[0]
      }
    })
  }

  if (options.git === undefined && !useDefaults) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize git repository?',
      initial: true
    })
  }

  const answers = await prompts(questions, {
    onCancel: () => {
      throw new CancelError('The operation has been cancelled.')
    }
  })

  return {
    type: options.type ?? answers.type,
    name: options.name ?? answers.name,
    blockchain: options.blockchain ?? answers.blockchainOther ?? answers.blockchain,
    scope: options.scope ?? answers.scope,
    git: options.git ?? answers.git ?? true
  }
}
