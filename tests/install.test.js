import { jest } from '@jest/globals'
import EventEmitter from 'events'

const mockSpawn = jest.fn()

jest.unstable_mockModule('child_process', () => ({
  spawn: mockSpawn
}))

const { detectPackageManager, getInstallCommand, installDependencies } = await import('../src/helpers/install.js')

const TARGET_DIR = '/output/wdk-wallet-stellar'
const ORIGINAL_USER_AGENT = process.env.npm_config_user_agent

describe('detectPackageManager', () => {
  afterEach(() => {
    if (ORIGINAL_USER_AGENT === undefined) {
      delete process.env.npm_config_user_agent
    } else {
      process.env.npm_config_user_agent = ORIGINAL_USER_AGENT
    }
  })

  test('should return yarn when the user agent starts with yarn', () => {
    process.env.npm_config_user_agent = 'yarn/1.22.0 npm/? node/v22.0.0'

    expect(detectPackageManager()).toBe('yarn')
  })

  test('should return pnpm when the user agent starts with pnpm', () => {
    process.env.npm_config_user_agent = 'pnpm/8.0.0 npm/? node/v22.0.0'

    expect(detectPackageManager()).toBe('pnpm')
  })

  test('should return npm when the user agent is empty', () => {
    process.env.npm_config_user_agent = ''

    expect(detectPackageManager()).toBe('npm')
  })

  test('should return npm when the user agent is unrecognized', () => {
    process.env.npm_config_user_agent = 'unknown-agent/1.0'

    expect(detectPackageManager()).toBe('npm')
  })
})

describe('getInstallCommand', () => {
  test('should return yarn for the yarn package manager', () => {
    expect(getInstallCommand('yarn')).toBe('yarn')
  })

  test('should return pnpm install for the pnpm package manager', () => {
    expect(getInstallCommand('pnpm')).toBe('pnpm install')
  })

  test('should return npm install for the npm package manager', () => {
    expect(getInstallCommand('npm')).toBe('npm install')
  })
})

describe('installDependencies', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should spawn npm install in the target directory by default', async () => {
    const child = new EventEmitter()
    mockSpawn.mockReturnValue(child)

    const promise = installDependencies(TARGET_DIR)
    child.emit('close', 0)
    await promise

    expect(mockSpawn).toHaveBeenCalledWith('npm', ['install'], {
      cwd: TARGET_DIR,
      shell: true,
      stdio: 'inherit'
    })
  })

  test('should spawn yarn with no args when package manager is yarn', async () => {
    const child = new EventEmitter()
    mockSpawn.mockReturnValue(child)

    const promise = installDependencies(TARGET_DIR, 'yarn')
    child.emit('close', 0)
    await promise

    expect(mockSpawn).toHaveBeenCalledWith('yarn', [], {
      cwd: TARGET_DIR,
      shell: true,
      stdio: 'inherit'
    })
  })

  test('should reject when the process exits with a non-zero code', async () => {
    const child = new EventEmitter()
    mockSpawn.mockReturnValue(child)

    const promise = installDependencies(TARGET_DIR)
    child.emit('close', 1)

    await expect(promise).rejects.toThrow('npm install failed with code 1')
  })
})
