import { jest } from '@jest/globals'

const mockFs = {
  pathExists: jest.fn(),
  ensureDir: jest.fn(),
  readdir: jest.fn(),
  readFile: jest.fn(),
  writeFile: jest.fn(),
  copy: jest.fn()
}

const mockOraInstance = {
  start: jest.fn().mockReturnThis(),
  succeed: jest.fn().mockReturnThis(),
  fail: jest.fn().mockReturnThis(),
  warn: jest.fn().mockReturnThis()
}

const mockExecSync = jest.fn()

jest.unstable_mockModule('fs-extra', () => ({ default: mockFs }))
jest.unstable_mockModule('ora', () => ({ default: () => mockOraInstance }))
jest.unstable_mockModule('child_process', () => ({ execSync: mockExecSync, spawn: jest.fn() }))

const { createWdkModule } = await import('../src/create-wdk-module.js')

const WALLET_OPTIONS = {
  type: 'wallet',
  name: 'stellar',
  git: false
}

function createDirent (name, isDir) {
  return { name, isDirectory: () => isDir, isFile: () => !isDir }
}

function setupTemplateFs () {
  mockFs.pathExists
    .mockResolvedValueOnce(false)
    .mockResolvedValueOnce(true)
    .mockResolvedValueOnce(true)
    .mockResolvedValueOnce(true)
  mockFs.readdir.mockResolvedValue([createDirent('index.js', false)])
  mockFs.readFile.mockResolvedValue('{{MODULE_NAME}}')
}

describe('createWdkModule', () => {
  let mockExit

  beforeEach(() => {
    jest.clearAllMocks()
    mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
      throw new Error(`process.exit(${code})`)
    })
    mockExecSync.mockReturnValue('Your Name')
  })

  afterEach(() => {
    mockExit.mockRestore()
  })

  test('should create the module directory and copy templates for a wallet module', async () => {
    setupTemplateFs()

    await createWdkModule(WALLET_OPTIONS)

    expect(mockFs.ensureDir).toHaveBeenCalled()
    expect(mockFs.writeFile).toHaveBeenCalled()
    expect(mockOraInstance.succeed).toHaveBeenCalledWith('Template files copied')
  })

  test('should generate correct template context with placeholder values', async () => {
    setupTemplateFs()

    await createWdkModule(WALLET_OPTIONS)

    const writtenContent = mockFs.writeFile.mock.calls[0][1]
    expect(writtenContent).toBe('wdk-wallet-stellar')
  })

  test('should strip the scope prefix from the directory name', async () => {
    setupTemplateFs()

    await createWdkModule({
      type: 'wallet',
      name: 'stellar',
      scope: '@myorg',
      git: false
    })

    const ensureDirCalls = mockFs.ensureDir.mock.calls.map(c => c[0])
    const hasScopedDir = ensureDirCalls.some(dir => dir.includes('@myorg'))
    expect(hasScopedDir).toBe(false)
  })

  test('should initialize git when git option is true and git is available', async () => {
    setupTemplateFs()
    mockExecSync.mockReturnValue('git version 2.40.0')

    await createWdkModule({ ...WALLET_OPTIONS, git: true })

    const gitInitCalls = mockExecSync.mock.calls.filter(c => c[0] === 'git init')
    expect(gitInitCalls.length).toBe(1)
    expect(mockOraInstance.succeed).toHaveBeenCalledWith('Git repository initialized')
  })

  test('should skip git initialization when git option is false', async () => {
    setupTemplateFs()

    await createWdkModule(WALLET_OPTIONS)

    const gitInitCalls = mockExecSync.mock.calls.filter(c => c[0] === 'git init')
    expect(gitInitCalls.length).toBe(0)
  })
})
