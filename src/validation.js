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

import validateNpmPackageName from 'validate-npm-package-name'
import { MODULE_CONFIGS } from '../config.js'

/**
 * Validates whether the given type is a supported module type.
 *
 * @param {string} type - The module type to validate.
 * @returns {boolean} Whether the type is valid.
 */
export function validateModuleType (type) {
  return ['wallet', 'swap', 'bridge', 'lending', 'fiat'].includes(type)
}

/**
 * Validates a module name against naming conventions.
 *
 * @param {string} name The module name to validate.
 * @returns {{ valid: boolean, errors: string[] }} The validation result with any errors.
 */
export function validateModuleName (name) {
  const errors = []

  if (!name || name.trim() === '') {
    errors.push('Module name cannot be empty')
  }

  if (!/^[a-z][a-z0-9-]*$/.test(name)) {
    errors.push('Module name must start with a letter and contain only lowercase letters, numbers, and hyphens')
  }

  if (name.length > 50) {
    errors.push('Module name must be 50 characters or less')
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Validates an npm scope string.
 *
 * @param {string} scope The npm scope to validate.
 * @returns {{ valid: boolean, errors: string[] }} The validation result with any errors.
 */
export function validateScope (scope) {
  const errors = []

  if (scope !== '' && !scope.startsWith('@')) {
    errors.push('Scope must start with @')
  }

  if (scope !== '') {
    const result = validateNpmPackageName(`${scope}/test`)
    if (!result.validForNewPackages) {
      errors.push(...(result.errors ?? []))
    }
  }

  return { valid: errors.length === 0, errors }
}
