import { describe, expect, test } from '@jest/globals'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const TEMPLATES_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../templates')

describe('templates', () => {
  test('should all require the same @tetherto/wdk-wallet version', async () => {
    const entries = await fs.readdir(TEMPLATES_DIR, { withFileTypes: true })

    const versions = {}

    for (const entry of entries) {
      const packageJsonPath = path.join(TEMPLATES_DIR, entry.name, 'package.json')

      if (entry.isDirectory() && await fs.pathExists(packageJsonPath)) {
        const { dependencies } = await fs.readJson(packageJsonPath)
        versions[entry.name] = dependencies['@tetherto/wdk-wallet']
      }
    }

    expect(Object.keys(versions).length).toBeGreaterThan(0)
    expect(new Set(Object.values(versions)).size).toBe(1)
  })
})
