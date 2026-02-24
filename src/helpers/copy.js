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

/**
 * @typedef {Object} TemplateContext
 * @property {string} MODULE_NAME The full package name (e.g., @myorg/wdk-wallet-stellar).
 * @property {string} CLASS_NAME The PascalCase name (e.g., Stellar).
 * @property {string} CLASS_NAME_LOWER The lowercase name for filenames (e.g., stellar).
 * @property {string} PACKAGE_NAME The directory-safe package name.
 * @property {string} BLOCKCHAIN The blockchain or network name.
 * @property {string} DESCRIPTION The module description.
 * @property {string} YEAR The current year.
 * @property {string} AUTHOR The author from git config or default.
 */

const PLACEHOLDER_REGEX = /\{\{([A-Z_]+)\}\}/g

/**
 * Copies a template directory to the target, replacing placeholders in file names and contents.
 *
 * @param {string} templateDir The source template directory path.
 * @param {string} targetDir The destination directory path.
 * @param {TemplateContext} context The placeholder replacement values.
 * @returns {Promise<void>}
 */
export async function copyTemplate (templateDir, targetDir, context) {
  await fs.ensureDir(targetDir)

  const files = await getAllFiles(templateDir)

  for (const file of files) {
    const relativePath = path.relative(templateDir, file)
    const processedPath = processPath(relativePath, context)
    const targetPath = path.join(targetDir, processedPath)

    await fs.ensureDir(path.dirname(targetPath))

    if (isBinaryFile(file)) {
      await fs.copy(file, targetPath)
    } else {
      const content = await fs.readFile(file, 'utf-8')
      const processedContent = processContent(content, context)
      await fs.writeFile(targetPath, processedContent)
    }
  }
}

/**
 * Recursively collects all file paths within a directory, excluding .git directories.
 *
 * @param {string} dir The directory to traverse.
 * @returns {Promise<string[]>} The list of file paths.
 */
async function getAllFiles (dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name !== '.git') {
        files.push(...await getAllFiles(fullPath))
      }
    } else {
      files.push(fullPath)
    }
  }

  return files
}

/**
 * Replaces placeholders in a file path with context values.
 *
 * @param {string} filePath The file path containing placeholders.
 * @param {TemplateContext} context The placeholder replacement values.
 * @returns {string} The processed file path.
 */
function processPath (filePath, context) {
  return filePath.replace(PLACEHOLDER_REGEX, (_, key) => {
    const value = context[key]
    return value !== '' && value != null ? value : key
  })
}

/**
 * Replaces placeholders in file content with context values.
 *
 * @param {string} content The file content containing placeholders.
 * @param {TemplateContext} context The placeholder replacement values.
 * @returns {string} The processed content.
 */
function processContent (content, context) {
  return content.replace(PLACEHOLDER_REGEX, (_, key) => {
    const value = context[key]
    return value !== '' && value != null ? value : `{{${key}}}`
  })
}

/**
 * Checks whether a file is binary based on its extension.
 *
 * @param {string} filePath The file path to check.
 * @returns {boolean} Whether the file is binary.
 */
function isBinaryFile (filePath) {
  const binaryExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.eot']
  return binaryExtensions.some(ext => filePath.toLowerCase().endsWith(ext))
}

/**
 * Copies common template files to the target directory if they exist.
 *
 * @param {string} commonDir The common templates directory path.
 * @param {string} targetDir The destination directory path.
 * @param {TemplateContext} context The placeholder replacement values.
 * @returns {Promise<void>}
 */
export async function copyCommonFiles (commonDir, targetDir, context) {
  if (await fs.pathExists(commonDir)) {
    await copyTemplate(commonDir, targetDir, context)
  }
}
