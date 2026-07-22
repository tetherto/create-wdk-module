import { beforeEach, describe, expect, jest, test } from '@jest/globals'

import {{pascalCase NAME}}Protocol from '../index.js'

describe('{{pascalCase NAME}}Protocol', () => {
  let account,
      protocol

  beforeEach(() => {
    account = {
      getAddress: jest.fn()
    }

    protocol = new {{pascalCase NAME}}Protocol(account)
  })

  describe('getSupportedRoutes', () => {
    test.todo('should successfully return supported routes')

    test.todo('should filter routes by source chain, input token and output asset')
  })

  describe('quoteDeposit', () => {
    test.todo('should successfully quote a deposit')
  })

  describe('createDepositAddress', () => {
    test.todo('should successfully create a deposit address and descriptor')

    test.todo('should default the destination address to the account address')
  })

  describe('getDepositAddress', () => {
    test.todo('should successfully look up an existing deposit address')

    test.todo('should throw if no address exists')
  })

  describe('getTransfers', () => {
    test.todo('should successfully return transfers for an address')
  })

  describe('getTransfer', () => {
    test.todo('should successfully return a single transfer')

    test.todo('should throw if no transfer exists for the given id')
  })

  describe('recoverDepositAddress', () => {
    test.todo('should successfully reindex or reactivate an undetected deposit')
  })

  describe('disableDepositAddress', () => {
    test.todo('should successfully disable a deposit address')
  })
})
