import { beforeEach, describe, expect, jest, test } from '@jest/globals'

import {{pascalCase NAME}}Protocol{{pascalCase BLOCKCHAIN}} from '../index.js'

describe('{{pascalCase NAME}}Protocol{{pascalCase BLOCKCHAIN}}', () => {
  let account,
      protocol

  beforeEach(() => {
    account = {
      sendTransaction: jest.fn()
    }

    protocol = new {{pascalCase NAME}}Protocol{{pascalCase BLOCKCHAIN}}(account)
  })

  describe('supply', () => {
    test.todo('should successfully perform a supply operation')

    test.todo('should throw if the account is read-only')

    test.todo('should throw if the account is not connected to a provider')
  })

  describe('quoteSupply', () => {
    test.todo('should successfully quote a supply operation')

    test.todo('should throw if the account is not connected to a provider')
  })

  describe('withdraw', () => {
    test.todo('should successfully perform a withdraw operation')

    test.todo('should throw if the account is read-only')

    test.todo('should throw if the account is not connected to a provider')
  })

  describe('quoteWithdraw', () => {
    test.todo('should successfully quote a withdraw operation')

    test.todo('should throw if the account is not connected to a provider')
  })

  describe('borrow', () => {
    test.todo('should successfully perform a borrow operation')

    test.todo('should throw if the account is read-only')

    test.todo('should throw if the account is not connected to a provider')
  })

  describe('quoteBorrow', () => {
    test.todo('should successfully quote a borrow operation')

    test.todo('should throw if the account is not connected to a provider')
  })

  describe('repay', () => {
    test.todo('should successfully perform a repay operation')

    test.todo('should throw if the account is read-only')

    test.todo('should throw if the account is not connected to a provider')
  })

  describe('quoteRepay', () => {
    test.todo('should successfully quote a repay operation')

    test.todo('should throw if the account is not connected to a provider')
  })
})
