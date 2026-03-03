import { afterEach, beforeEach, describe, expect, test, jest } from '@jest/globals'

import { WalletAccount{{pascalCase NAME}}, WalletAccountReadOnly{{pascalCase NAME}} } from '../index.js'

const SEED_PHRASE = 'test only example nut use this real life secret phrase must random'

describe('WalletAccount{{pascalCase NAME}}', () => {
  let account

  beforeEach(() => {
    account = new WalletAccount{{pascalCase NAME}}(SEED_PHRASE, "0'/0/0")
  })

  afterEach(() => {
    account.dispose()
  })

  describe('constructor', () => {
    test.todo('should successfully initialize an account for the given seed phrase and path')

    test.todo('should successfully initialize an account for the given seed and path')

    test.todo('should throw if the seed phrase is invalid')

    test.todo('should throw if the path is invalid')
  })

  describe('getAddress', () => {
    test.todo('should return the correct address')
  })

  describe('sign', () => {
    test.todo('should return the correct signature')
  })

  describe('sendTransaction', () => {
    test.todo('should successfully send a transaction')

    test.todo('should throw if the account is not connected to a provider')
  })

  describe('transfer', () => {
    test.todo('should successfully transfer tokens')

    test.todo('should throw if transfer fee exceeds the transfer max fee configuration')

    test.todo('should throw if the account is not connected to a provider')
  })

  describe('toReadOnlyAccount', () => {
    test.todo('should return a read-only copy of the account')
  })
})
