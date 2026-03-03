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

const MODULE_NAME_PATTERN = /^[a-z][a-z0-9-.]*$/

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
 * Validates an npm scope string.
 *
 * @param {string} scope - The npm scope to validate.
 * @returns {{ valid: boolean, errors: string[] }} The validation result with any errors.
 */
export function validateScope (scope) {
  const errors = []

  if (!scope.startsWith('@')) {
    errors.push('Scopes must start with @')
  }

  const { errors: otherErrors } = validateModuleName(scope.slice(1))

  errors.push(...otherErrors.map(error => error.replace('Module name', 'Scope')))

  return { valid: errors.length === 0, errors }
}

/**
 * Validates a module name against naming conventions.
 *
 * @param {string} name - The module name to validate.
 * @returns {{ valid: boolean, errors: string[] }} The validation result with any errors.
 */
export function validateModuleName (name) {
  const errors = []

  if (!name) {
    errors.push('Module names cannot be empty')
  }

  if (!MODULE_NAME_PATTERN.test(name)) {
    errors.push('Module names must start with a letter and contain only lowercase letters, numbers, and hyphens')
  }

  if (name.length > 50) {
    errors.push('Module names cannot be longer than 50 characters')
  }

  return { valid: errors.length === 0, errors }
}
