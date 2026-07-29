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

    test.todo('should throw if the source or destination blockchain is not set')
  })

  describe('createDepositAddress', () => {
    test.todo('should successfully create a deposit address and descriptor')

    test.todo('should default the destination address to the account address')

    test.todo('should throw if destinationAddress is omitted and no account is bound')

    test.todo('should throw if the output asset is required and not provided')
  })

  describe('quoteDeposit', () => {
    test.todo('should successfully quote a deposit')

    test.todo('should throw if the output asset is required and not provided')
  })

  describe('deriveDepositAddress', () => {
    test.todo('should successfully derive a deposit address client-side')

    test.todo('should default the destination address to the account address')

    test.todo('should throw if destinationAddress is omitted and no account is bound')
  })

  describe('getDepositAddress', () => {
    test.todo('should successfully look up an existing deposit address')

    test.todo('should throw if no address exists')
  })

  describe('renewDepositAddress', () => {
    test.todo('should successfully refresh the activation of a deposit address')
  })

  describe('getTransfers', () => {
    test.todo('should successfully return transfers for an address')

    test.todo('should paginate/filter transfers when options are provided')
  })

  describe('getTransfersByRecipient', () => {
    test.todo('should successfully return transfers routed to a recipient')

    test.todo('should paginate/filter transfers when options are provided')
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
