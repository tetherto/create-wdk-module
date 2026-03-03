import { afterEach, beforeEach, describe, expect, test } from '@jest/globals'

import WalletManager{{pascalCase NAME}}, { WalletAccount{{pascalCase NAME}} } from '../index.js'

const SEED_PHRASE = 'test only example nut use this real life secret phrase must random'

describe('WalletManager{{pascalCase NAME}}', () => {
  let wallet

  beforeEach(() => {
    wallet = new WalletManager{{pascalCase NAME}}(SEED_PHRASE)
  })

  afterEach(() => {
    wallet.dispose()
  })

  describe('getAccount', () => {
    test.todo('should return the account at index 0 by default')

    test.todo('should return the account at the given index')

    test.todo('should throw if the index is a negative number')
  })

  describe('getAccountByPath', () => {
    test.todo('should return the account with the given path')

    test.todo('should throw if the path is invalid')
  })

  describe('getFeeRates', () => {
    test.todo('should return the correct fee rates')

    test.todo('should throw if the wallet is not connected to a provider')
  })
})
