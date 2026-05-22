import { beforeEach, describe, expect, jest, test } from '@jest/globals'

import {{pascalCase NAME}}Protocol from '../index.js'

describe('{{pascalCase NAME}}Protocol', () => {
  let protocol

  beforeEach(() => {
    protocol = new {{pascalCase NAME}}Protocol()
  })

  describe('quoteSwidge', () => {
    test.todo('should successfully return a swidge quote with fees')

    test.todo('should support exact-in quoting')

    test.todo('should support exact-out quoting')
  })

  describe('swidge', () => {
    test.todo('should successfully execute a cross-chain swap')

    test.todo('should accept optional protocol config')

    test.todo('should throw when swidge parameters are invalid')
  })

  describe('getSwidgeStatus', () => {
    test.todo('should successfully return the status of a pending operation')

    test.todo('should successfully return the status of a completed operation')
  })

  describe('getSupportedChains', () => {
    test.todo('should successfully return supported chains')
  })

  describe('getSupportedTokens', () => {
    test.todo('should successfully return supported tokens')

    test.todo('should filter tokens by chain when options are provided')
  })
})
