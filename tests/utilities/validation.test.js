import {
  validateModuleType,
  validateModuleName,
  validateScope
} from '../../src/utilities/validation.js'

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

describe('validateScope', () => {
  test('should return valid when given a scope starting with @', () => {
    const result = validateScope('@myorg')

    expect(result).toEqual({ valid: true, errors: [] })
  })

  test('should return invalid when given an empty string', () => {
    const result = validateScope('@')

    expect(result.valid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
  })

  test('should return invalid when given a scope without the @ prefix', () => {
    const result = validateScope('myorg')

    expect(result.valid).toBe(false)
    expect(result.errors[0]).toBe('Scopes must start with @')
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
      'Module names must start with a letter and contain only lowercase letters, numbers, and hyphens'
    )
  })
})
