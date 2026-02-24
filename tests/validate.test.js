import {
  validateModuleType,
  validateModuleName,
  validateScope,
  generatePackageName,
  toPascalCase
} from '../src/helpers/validate.js'

describe('validateModuleType', () => {
  test('should return true when given a valid module type', () => {
    expect(validateModuleType('wallet')).toBe(true)
    expect(validateModuleType('swap')).toBe(true)
    expect(validateModuleType('bridge')).toBe(true)
    expect(validateModuleType('lending')).toBe(true)
    expect(validateModuleType('fiat')).toBe(true)
  })

  test('should return false when given an unknown type', () => {
    expect(validateModuleType('invalid')).toBe(false)
  })

  test('should return false when given an empty string', () => {
    expect(validateModuleType('')).toBe(false)
  })

  test('should return false when given an uppercase variant', () => {
    expect(validateModuleType('WALLET')).toBe(false)
  })
})

describe('validateModuleName', () => {
  test('should return valid when given a lowercase alphabetic name', () => {
    const result = validateModuleName('stellar')

    expect(result).toEqual({ valid: true, errors: [] })
  })

  test('should return valid when given a hyphenated name', () => {
    const result = validateModuleName('my-protocol')

    expect(result).toEqual({ valid: true, errors: [] })
  })

  test('should return valid when given an alphanumeric name', () => {
    const result = validateModuleName('protocol123')

    expect(result).toEqual({ valid: true, errors: [] })
  })

  test('should return invalid when given an empty string', () => {
    const result = validateModuleName('')

    expect(result.valid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
  })

  test('should return invalid when given a name starting with a number', () => {
    const result = validateModuleName('123start')

    expect(result.valid).toBe(false)
  })

  test('should return invalid when given an uppercase name', () => {
    const result = validateModuleName('Invalid')

    expect(result.valid).toBe(false)
  })

  test('should return invalid when given a name with spaces', () => {
    const result = validateModuleName('has space')

    expect(result.valid).toBe(false)
  })

  test('should return invalid when given a name exceeding 50 characters', () => {
    const longName = 'a'.repeat(51)

    const result = validateModuleName(longName)

    expect(result.valid).toBe(false)
  })

  test('should include a descriptive error message for invalid names', () => {
    const result = validateModuleName('Invalid')

    expect(result.errors[0]).toBe(
      'Module name must start with a letter and contain only lowercase letters, numbers, and hyphens'
    )
  })
})

describe('validateScope', () => {
  test('should return valid when given a scope starting with @', () => {
    const result = validateScope('@myorg')

    expect(result).toEqual({ valid: true, errors: [] })
  })

  test('should return valid when given an empty string', () => {
    const result = validateScope('')

    expect(result).toEqual({ valid: true, errors: [] })
  })

  test('should return invalid when given a scope without the @ prefix', () => {
    const result = validateScope('myorg')

    expect(result.valid).toBe(false)
    expect(result.errors[0]).toBe('Scope must start with @')
  })
})

describe('generatePackageName', () => {
  test('should generate a wallet package name from the chain name', () => {
    const result = generatePackageName('wallet', 'stellar')

    expect(result).toBe('wdk-wallet-stellar')
  })

  test('should prepend the scope to a wallet package name', () => {
    const result = generatePackageName('wallet', 'stellar', undefined, '@myorg')

    expect(result).toBe('@myorg/wdk-wallet-stellar')
  })

  test('should generate a swap package name from protocol and blockchain', () => {
    const result = generatePackageName('swap', 'jupiter', 'solana')

    expect(result).toBe('wdk-protocol-swap-jupiter-solana')
  })

  test('should generate a bridge package name from protocol and blockchain', () => {
    const result = generatePackageName('bridge', 'wormhole', 'evm')

    expect(result).toBe('wdk-protocol-bridge-wormhole-evm')
  })

  test('should generate a lending package name from protocol and blockchain', () => {
    const result = generatePackageName('lending', 'compound', 'evm')

    expect(result).toBe('wdk-protocol-lending-compound-evm')
  })

  test('should generate a fiat package name from the provider name', () => {
    const result = generatePackageName('fiat', 'moonpay')

    expect(result).toBe('wdk-protocol-fiat-moonpay')
  })

  test('should throw with a descriptive message when blockchain is missing for a protocol module', () => {
    expect(() => generatePackageName('swap', 'jupiter'))
      .toThrow('Blockchain is required for swap modules')
  })
})

describe('toPascalCase', () => {
  test('should capitalize a single lowercase word', () => {
    expect(toPascalCase('stellar')).toBe('Stellar')
  })

  test('should capitalize each segment of a hyphenated string', () => {
    expect(toPascalCase('jupiter-swap')).toBe('JupiterSwap')
  })
})
