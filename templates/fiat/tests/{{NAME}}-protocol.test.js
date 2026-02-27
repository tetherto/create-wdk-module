import { beforeEach, describe, expect, jest, test } from '@jest/globals'

import {{pascalCase NAME}}Protocol from '../index.js'

describe('{{pascalCase NAME}}Protocol', () => {
  let protocol

  beforeEach(() => {
    protocol = new {{pascalCase NAME}}Protocol()
  })

  describe('buy', () => {
    test.todo('should successfully generate a buy URL to buy an exact crypto amount')

    test.todo('should successfully generate a buy URL to buy with a specified fiat amount')
  })

  describe('quoteBuy', () => {
    test.todo('should successfully quote a buy transaction for an exact fiat amount')

    test.todo('should successfully quote a buy transaction with a specified crypto amount')
  })

  describe('sell', () => {
    test.todo('should successfully generate a sell URL to sell an exact crypto amount')

    test.todo('should successfully generate a sell URL to sell for a specified fiat amount')
  })

  describe('quoteSell', () => {
    test.todo('should successfully quote a sell transaction of an exact fiat amount')

    test.todo('should successfully quote a sell transaction with a specified crypto amount')
  })

  describe('getTransactionDetail', () => {
    test.todo('should successfully fetch buy transaction details')

    test.todo('should successfully fetch sell transaction details')
  })

  describe('getSupportedCryptoAssets', () => {
    test.todo('should successfully return supported crypto assets')
  })

  describe('getSupportedFiatCurrencies', () => {
    test.todo('should successfully return supported fiat currencies')
  })

  describe('getSupportedCountries', () => {
    test.todo('should successfully return supported countries')
  })
})
