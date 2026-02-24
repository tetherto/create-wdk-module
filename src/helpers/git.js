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

import { execSync } from 'child_process'

/**
 * Initializes a git repository with an initial commit.
 *
 * @param {string} targetDir The directory to initialize git in.
 */
export function initGit (targetDir) {
  try {
    execSync('git init', { cwd: targetDir, stdio: 'ignore' })
    execSync('git add -A', { cwd: targetDir, stdio: 'ignore' })
    execSync('git commit -m "Initial commit from create-wdk-module"', {
      cwd: targetDir,
      stdio: 'ignore'
    })
  } catch {
    // Git init failed, but we can continue without it
  }
}

/**
 * Reads the git author name and email from git config.
 *
 * @returns {string} The formatted author string, or 'Your Name' as fallback.
 */
export function getGitAuthor () {
  try {
    const name = execSync('git config user.name', { encoding: 'utf-8' }).trim()
    const email = execSync('git config user.email', { encoding: 'utf-8' }).trim()
    return email !== '' ? `${name} <${email}>` : name
  } catch {
    return 'Your Name'
  }
}

/**
 * Checks whether git is available on the system.
 *
 * @returns {boolean} Whether the git command is available.
 */
export function isGitAvailable () {
  try {
    execSync('git --version', { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}
