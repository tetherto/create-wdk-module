import { jest } from '@jest/globals'

const mockExecSync = jest.fn()

jest.unstable_mockModule('child_process', () => ({
  execSync: mockExecSync
}))

const { initGit, getGitAuthor, isGitAvailable } = await import('../src/helpers/git.js')

const TARGET_DIR = '/output/wdk-wallet-stellar'

describe('initGit', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should run git init, add, and commit in the target directory', () => {
    initGit(TARGET_DIR)

    expect(mockExecSync).toHaveBeenCalledTimes(3)
    expect(mockExecSync).toHaveBeenNthCalledWith(1, 'git init', { cwd: TARGET_DIR, stdio: 'ignore' })
    expect(mockExecSync).toHaveBeenNthCalledWith(2, 'git add -A', { cwd: TARGET_DIR, stdio: 'ignore' })
    expect(mockExecSync).toHaveBeenNthCalledWith(3, 'git commit -m "Initial commit from create-wdk-module"', {
      cwd: TARGET_DIR,
      stdio: 'ignore'
    })
  })

  test('should not throw when git commands fail', () => {
    mockExecSync.mockImplementation(() => { throw new Error('git not found') })

    expect(() => initGit(TARGET_DIR)).not.toThrow()
  })
})

describe('getGitAuthor', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return formatted name and email when both are configured', () => {
    mockExecSync
      .mockReturnValueOnce('Jane Doe\n')
      .mockReturnValueOnce('jane@example.com\n')

    const result = getGitAuthor()

    expect(result).toBe('Jane Doe <jane@example.com>')
  })

  test('should return name only when email is empty', () => {
    mockExecSync
      .mockReturnValueOnce('Jane Doe\n')
      .mockReturnValueOnce('\n')

    const result = getGitAuthor()

    expect(result).toBe('Jane Doe')
  })

  test('should return the fallback when git config throws', () => {
    mockExecSync.mockImplementation(() => { throw new Error('not configured') })

    const result = getGitAuthor()

    expect(result).toBe('Your Name')
  })
})

describe('isGitAvailable', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return true when git --version succeeds', () => {
    mockExecSync.mockReturnValue('git version 2.40.0')

    expect(isGitAvailable()).toBe(true)
  })

  test('should return false when git --version throws', () => {
    mockExecSync.mockImplementation(() => { throw new Error('command not found') })

    expect(isGitAvailable()).toBe(false)
  })
})
