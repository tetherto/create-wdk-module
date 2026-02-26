#!/usr/bin/env node

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

import pc from 'picocolors'

import { Command } from 'commander'

import { runPrompts } from './prompts.js'
import { validateModuleType, validateModuleName } from './validation.js'
import { createWdkModule } from './create-wdk-module.js'

const program = new Command()

program
  .name('create-wdk-module')
  .description('Create WDK modules with a single command')
  .version('1.0.0-beta.1')
  .argument('[type]', 'Module type (wallet/swap/bridge/lending/fiat)')
  .argument('[name]', 'Module name')
  .argument('[blockchain]', 'Target blockchain (for protocol modules)')
  .option('-s, --scope <scope>', 'npm scope (e.g., @myorg)')
  .option('--git', 'Initialize git repository', true)
  .option('--no-git', 'Skip git initialization')
  .option('-y, --yes', 'Skip prompts and use defaults', false)
  .action(async (type, name, blockchain, { scope, git, yes }) => {
    console.log()
    console.log(pc.bold('  Create WDK Module'))
    console.log()

    try {
      let moduleOptions

      if (type != null && name != null && yes) {
        if (!validateModuleType(type)) {
          console.error(pc.red(`Invalid module type: ${type}`))
          console.error(pc.dim('Valid types: wallet, swap, bridge, lending, fiat'))
          process.exit(1)
        }

        const nameValidation = validateModuleName(name)
        if (!nameValidation.valid) {
          console.error(pc.red('Invalid module name:'))
          nameValidation.errors.forEach(e => console.error(pc.red(`  - ${e}`)))
          process.exit(1)
        }

        if (['swap', 'bridge', 'lending', 'fiat'].includes(type)) {
          if (!blockchain) {
            console.error(pc.red(`Blockchain argument is required for ${type} modules`))
            console.error(pc.dim(`Usage: create-wdk-module ${type} <name> <blockchain>`))
            process.exit(1)
          }

          const blockchainValidation = validateModuleName(blockchain)

          if (!blockchainValidation.valid) {
            console.error(pc.red('Invalid blockchain:'))
            blockchainValidation.errors.forEach(e => console.error(pc.red(`  - ${e}`)))
            process.exit(1)
          }
        }

        moduleOptions = { type, name, blockchain, scope, git }
      } else if (type != null && name != null) {
        if (!validateModuleType(type)) {
          console.error(pc.red(`Invalid module type: ${type}`))
          console.error(pc.dim('Valid types: wallet, swap, bridge, lending, fiat'))
          process.exit(1)
        }

        const nameValidation = validateModuleName(name)
        if (!nameValidation.valid) {
          console.error(pc.red('Invalid module name:'))
          nameValidation.errors.forEach(e => console.error(pc.red(`  - ${e}`)))
          process.exit(1)
        }

        moduleOptions = await runPrompts({ type, name, blockchain, scope, git })
      } else {
        moduleOptions = await runPrompts({ type, name, blockchain, scope, git })
      }

      await createWdkModule(moduleOptions)
    } catch (error) {
      if (error.message === 'cancelled') {
        console.log(pc.dim('\nOperation cancelled'))
        process.exit(0)
      }
      throw error
    }
  })

program.parse()
