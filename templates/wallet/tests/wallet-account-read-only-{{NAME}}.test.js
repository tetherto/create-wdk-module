import { afterEach, beforeEach, describe, expect, test } from '@jest/globals'

import { WalletAccountReadOnly{{pascalCase NAME}} } from '../index.js'

// TODO: Set up a valid test address
const ADDRESS = '0x405005C7c4422390F4B334F64Cf20E0b767131d0'

describe('WalletAccountReadOnly{{pascalCase NAME}}', () => {
  let account

  beforeEach(() => {
    account = new WalletAccountReadOnly{{pascalCase NAME}}(ADDRESS)
  })

  describe('verify', () => {
    test.todo('should return true for a valid signature')

    test.todo('should return false for an invalid signature')

    test.todo('should throw on a malformed signature')
  })

  describe('getBalance', () => {
    test.todo('should return the correct balance of the account')

    test.todo('should throw if the account is not connected to a provider')
  })

  describe('getTokenBalance', () => {
    test.todo('should return the correct token balance of the account')

    test.todo('should throw if the account is not connected to a provider')
  })

  describe('quoteSendTransaction', () => {
    test.todo('should successfully quote a transaction')

    test.todo('should throw if the account is not connected to a provider')
  })

  describe('quoteTransfer', () => {
    test.todo('should successfully quote a transfer operation')

    test.todo('should throw if the account is not connected to a provider')
  })

  describe('getTransactionReceipt', () => {
    test.todo('should return the correct transaction receipt')

    test.todo('should return null if the transaction has not been included in a block yet')

    test.todo('should throw if the account is not connected to a provider')
  })
})
