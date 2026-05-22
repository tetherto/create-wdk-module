import { beforeEach, describe, expect, jest, test } from '@jest/globals'

import {{pascalCase NAME}}Protocol from '../index.js'

describe('{{pascalCase NAME}}Protocol', () => {
  let account,
      protocol

  beforeEach(() => {
    account = {
      sendTransaction: jest.fn()
    }

    protocol = new {{pascalCase NAME}}Protocol(account)
  })

  describe('quoteSwidge', () => {
    test.todo('should successfully quote a swidge operation (exact-in)')

    test.todo('should successfully quote a swidge operation (exact-out)')
  })

  describe('swidge', () => {
    test.todo('should successfully perform a swidge operation (exact-in)')

    test.todo('should successfully perform a swidge operation (exact-out)')

    test.todo('should throw if the swidge fees exceed the max network fee configuration')

    test.todo('should throw if the swidge fees exceed the max protocol fee configuration')

    test.todo('should throw if the account is read-only')
  })

  describe('getSwidgeStatus', () => {
    test.todo('should successfully return the status of an operation')

    test.todo('should successfully return the status of an operation by filtering the source and target chain')

    test.todo('should throw if no operation exists for the given id')
  })

  describe('getSupportedChains', () => {
    test.todo('should successfully return supported chains')
  })

  describe('getSupportedTokens', () => {
    test.todo('should successfully return supported tokens')

    test.todo('should filter tokens by chain when options are provided')
  })
})
