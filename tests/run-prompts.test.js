import { jest } from '@jest/globals'

let mockPromptsReturn = {}
let mockOnCancel = null
let mockQuestions = []

const mockIsOfficialPackage = jest.fn()

jest.unstable_mockModule('prompts', () => ({
  default: jest.fn(async (questions, opts) => {
    mockQuestions = questions
    mockOnCancel = opts?.onCancel
    return mockPromptsReturn
  })
}))

jest.unstable_mockModule('../src/utilities/registry.js', () => ({
  isOfficialPackage: mockIsOfficialPackage
}))

const { runPrompts } = await import('../src/run-prompts.js')

describe('runPrompts', () => {
  beforeEach(() => {
    mockPromptsReturn = {}
    mockOnCancel = null
  })

  test('should return partial values without prompting when all options are provided', async () => {
    mockPromptsReturn = {}

    const result = await runPrompts({
      type: 'wallet',
      name: 'stellar',
      blockchain: undefined,
      scope: '@tetherto',
      git: true
    })

    expect(result).toEqual({
      type: 'wallet',
      name: 'stellar',
      blockchain: undefined,
      scope: '@tetherto',
      git: true
    })
  })

  test('should merge prompt answers with missing partial values', async () => {
    mockPromptsReturn = {
      type: 'fiat',
      name: 'moonpay',
      scope: '',
      git: false
    }

    const result = await runPrompts({})

    expect(result.type).toBe('fiat')
    expect(result.name).toBe('moonpay')
    expect(result.git).toBe(false)
  })

  test('should default git to true when neither partial nor prompt provides it', async () => {
    mockPromptsReturn = {
      type: 'wallet',
      name: 'stellar'
    }

    const result = await runPrompts({})

    expect(result.git).toBe(true)
  })

  test('should use the blockchain answer from prompts for protocol modules', async () => {
    mockPromptsReturn = {
      type: 'swap',
      name: 'jupiter',
      blockchain: 'solana',
      git: true
    }

    const result = await runPrompts({})

    expect(result.blockchain).toBe('solana')
  })

  test('should use the custom blockchain when _custom is selected', async () => {
    mockPromptsReturn = {
      type: 'swap',
      name: 'jupiter',
      blockchain: '_custom',
      blockchainOther: 'mychain',
      git: true
    }

    const result = await runPrompts({})

    expect(result.blockchain).toBe('mychain')
  })

  test('should use the variant answer from prompts for wallet modules', async () => {
    mockPromptsReturn = {
      type: 'wallet',
      name: 'evm',
      variant: 'railgun',
      git: true
    }

    const result = await runPrompts({})

    expect(result.variant).toBe('railgun')
  })

  test('should leave the variant undefined when the answer is empty', async () => {
    mockPromptsReturn = {
      type: 'wallet',
      name: 'stellar',
      variant: '',
      git: true
    }

    const result = await runPrompts({})

    expect(result.variant).toBeUndefined()
  })

  test('should throw cancelled when the user cancels the prompts', async () => {
    mockPromptsReturn = {}

    const promise = runPrompts({})
    await promise

    expect(mockOnCancel).toBeInstanceOf(Function)
    expect(() => mockOnCancel()).toThrow('cancelled')
  })

  describe('wallet variant prompt', () => {
    async function getVariantQuestion () {
      await runPrompts({ type: 'wallet', name: 'evm' })

      const question = mockQuestions.find(q => q.name === 'variant')
      question.type(undefined, {})

      return question
    }

    beforeEach(() => {
      mockIsOfficialPackage.mockReset()
    })

    test('should ask again if the name without a variant is an official package', async () => {
      mockIsOfficialPackage.mockResolvedValue(true)

      const question = await getVariantQuestion()

      expect(await question.validate('')).toMatch('wdk-wallet-evm is the name of an official WDK package')
      expect(mockIsOfficialPackage).toHaveBeenCalledWith('wdk-wallet-evm')
    })

    test('should accept a variant that is not an official package', async () => {
      mockIsOfficialPackage.mockResolvedValue(false)

      const question = await getVariantQuestion()

      expect(await question.validate('railgun')).toBe(true)
      expect(mockIsOfficialPackage).toHaveBeenCalledWith('wdk-wallet-evm-railgun')
    })

    test('should accept the name if the registry cannot be reached', async () => {
      mockIsOfficialPackage.mockResolvedValue(undefined)

      const question = await getVariantQuestion()

      expect(await question.validate('')).toBe(true)
    })

    test('should reject an invalid variant without checking the registry', async () => {
      const question = await getVariantQuestion()

      expect(await question.validate('Railgun!')).toMatch('Module names must start with a letter')
      expect(mockIsOfficialPackage).not.toHaveBeenCalled()
    })
  })
})
