import { jest } from '@jest/globals'

let mockPromptsReturn = {}
let mockOnCancel = null

jest.unstable_mockModule('prompts', () => ({
  default: jest.fn(async (_questions, opts) => {
    mockOnCancel = opts?.onCancel
    return mockPromptsReturn
  })
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

  test('should throw cancelled when the user cancels the prompts', async () => {
    mockPromptsReturn = {}

    const promise = runPrompts({})
    await promise

    expect(mockOnCancel).toBeInstanceOf(Function)
    expect(() => mockOnCancel()).toThrow('cancelled')
  })
})
