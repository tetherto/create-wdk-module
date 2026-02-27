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

  describe('bridge', () => {
    test.todo('should successfully perform a bridge operation')

    test.todo('should throw if the bridge fee exceeds the bridge max fee configuration')

    test.todo('should throw if the account is read-only')

    test.todo('should throw if the account is not connected to a provider')
  })

  describe('quoteBridge', () => {
    test.todo('should successfully quote a bridge operation')

    test.todo('should throw if the account is not connected to a provider')
  })
})
