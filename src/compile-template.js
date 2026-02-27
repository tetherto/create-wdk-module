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

import fs from 'fs-extra'

import Handlebars from 'handlebars'

/**
 * @typedef {Object} CompileTemplateOptions
 * @property {string} templateDir - The template's directory.
 * @property {string} targetDir - The target directory.
 * @property {TemplateContext} context - The template context.
 */

/**
 * @typedef {Object} TemplateContext
 * @property {string} PACKAGE_NAME - The full package name (e.g., @myorg/wdk-wallet-stellar).
 * @property {string} MODULE_NAME - The directory-safe module name.
 * @property {string} NAME - The wallet or the protocol's name.
 * @property {string} [BLOCKCHAIN] - The target blockchain.
 * @property {string} DESCRIPTION - The module description.
 * @property {string} YEAR - The current year.
 * @property {string} AUTHOR - The author.
 * @property {'npm' | 'yarn' | 'pnpm'} PACKAGE_MANAGER - The package manager in use.
 */

Handlebars.registerHelper("pascalCase", function (str) {
  return str
    .replace(/[_-]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
})

/**
 * Recursively collects all file paths within a directory.
 *
 * @param {string} dir - The directory to traverse.
 * @returns {Promise<string[]>} The list of file paths.
 */
async function getAllFilenames (dir) {
  const filenames = []

  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const filename = path.join(dir, entry.name)

    entry.isDirectory()
      ? filenames.push(...await getAllFilenames(filename))
      : filenames.push(filename)
  }

  return filenames
}

/**
 * Replaces placeholders in a text with context values.
 *
 * @param {string} text - The text containing placeholders.
 * @param {Record<string, string>} context - The placeholder replacement values.
 * @returns {string} The compiled text.
 */
function compile (text, context) {
  const template = Handlebars.compile(text)

  return template(context)
}

/**
 * Compiles a template directory to the target, replacing placeholders in file names and contents.
 *
 * @param {CompileTemplateOptions} options - The template options.
 * @returns {Promise<void>}
 */
export async function compileTemplate ({ templateDir, targetDir, context }) {
  await fs.ensureDir(targetDir)

  const filenames = await getAllFilenames(templateDir)

  for (const filename of filenames) {
    const relativePath = path.relative(templateDir, filename)

    const compiledRelativePath = compile(relativePath, context)
    const compiledFullPath = path.join(targetDir, compiledRelativePath)
    await fs.ensureDir(path.dirname(compiledFullPath))

    const file = await fs.readFile(filename, 'utf-8')
    const compiledFile = compile(file, context)
    await fs.writeFile(compiledFullPath, compiledFile)
  }
}
