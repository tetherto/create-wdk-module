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

  describe('swap', () => {
    test.todo('should successfully perform a swap operation (buy)')

    test.todo('should successfully perform a swap operation (sell)')

    test.todo('should throw if the swap fee exceeds the swap max fee configuration')

    test.todo('should throw if the account is read-only')

    test.todo('should throw if the account is not connected to a provider')
  })

  describe('quoteSwap', () => {
    test.todo('should successfully quote a swap operation (buy)')

    test.todo('should successfully quote a swap operation (sell)')

    test.todo('should throw if the account is not connected to a provider')
  })
})
