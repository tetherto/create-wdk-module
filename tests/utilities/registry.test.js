import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals'

import { isOfficialPackage } from '../../src/utilities/registry.js'

describe('isOfficialPackage', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  test('should look up the package in the @tetherto scope', async () => {
    global.fetch.mockResolvedValue({ ok: true, status: 200 })

    await isOfficialPackage('wdk-wallet-evm')

    expect(global.fetch).toHaveBeenCalledWith(
      'https://registry.npmjs.org/%40tetherto%2Fwdk-wallet-evm',
      expect.any(Object)
    )
  })

  test('should return true if the package exists', async () => {
    global.fetch.mockResolvedValue({ ok: true, status: 200 })

    expect(await isOfficialPackage('wdk-wallet-evm')).toBe(true)
  })

  test('should return false if the package does not exist', async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 404 })

    expect(await isOfficialPackage('wdk-wallet-stellar')).toBe(false)
  })

  test('should return undefined if the registry returns an unexpected status', async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 503 })

    expect(await isOfficialPackage('wdk-wallet-stellar')).toBeUndefined()
  })

  test('should return undefined if the registry cannot be reached', async () => {
    global.fetch.mockRejectedValue(new Error('getaddrinfo ENOTFOUND registry.npmjs.org'))

    expect(await isOfficialPackage('wdk-wallet-stellar')).toBeUndefined()
  })
})
