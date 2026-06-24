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

  describe('getCapabilities', () => {
    test.todo('should return the provider capability descriptor')
  })

  describe('getSupportedRoutes', () => {
    test.todo('should successfully return supported routes')

    test.todo('should filter routes by source chain, input token and destination asset')
  })

  describe('quoteDeposit', () => {
    test.todo('should successfully quote a deposit')
  })

  describe('createDepositAddress', () => {
    test.todo('should successfully create a deposit address and descriptor')

    test.todo('should default the destination address to the account address')

    test.todo('should pass through the refund address and reuse flag')
  })

  describe('getDepositAddress', () => {
    test.todo('should successfully look up an existing deposit address')

    test.todo('should throw if no address exists')
  })

  describe('getDepositAddressTransfers', () => {
    test.todo('should successfully return transfers for an address')
  })

  describe('getTransferStatus', () => {
    test.todo('should successfully return the status of a transfer')

    test.todo('should throw if no transfer exists for the given id')
  })

  describe('recoverDepositAddress', () => {
    test.todo('should successfully reindex or reactivate an undetected deposit')
  })

  describe('disableDepositAddress', () => {
    test.todo('should successfully disable a deposit address')
  })
})
