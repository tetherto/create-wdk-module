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

import { spawn } from 'child_process'

/**
 * Detects the package manager used to invoke the CLI.
 *
 * @returns {'npm' | 'yarn' | 'pnpm'} The detected package manager.
 */
export function detectPackageManager () {
  const userAgent = process.env.npm_config_user_agent ?? ''

  if (userAgent.startsWith('yarn')) return 'yarn'
  if (userAgent.startsWith('pnpm')) return 'pnpm'
  return 'npm'
}

/**
 * Installs dependencies in the target directory using the specified package manager.
 *
 * @param {string} targetDir The directory to install dependencies in.
 * @param {'npm' | 'yarn' | 'pnpm'} [packageManager='npm'] The package manager to use.
 * @returns {Promise<void>}
 * @throws {Error} If the install process exits with a non-zero code.
 */
export async function installDependencies (targetDir, packageManager = 'npm') {
  const command = packageManager === 'yarn' ? 'yarn' : packageManager
  const args = packageManager === 'yarn' ? [] : ['install']

  return await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: targetDir,
      shell: true,
      stdio: 'inherit'
    })

    child.on('close', code => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`${packageManager} install failed with code ${String(code)}`))
      }
    })
  })
}

/**
 * Returns the install command string for the given package manager.
 *
 * @param {'npm' | 'yarn' | 'pnpm'} packageManager The package manager.
 * @returns {string} The install command.
 */
export function getInstallCommand (packageManager) {
  switch (packageManager) {
    case 'yarn':
      return 'yarn'
    case 'pnpm':
      return 'pnpm install'
    default:
      return 'npm install'
  }
}
