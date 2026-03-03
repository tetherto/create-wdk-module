import { jest } from '@jest/globals'

const mockFs = {
  ensureDir: jest.fn(),
  readdir: jest.fn(),
  readFile: jest.fn(),
  writeFile: jest.fn(),
  copy: jest.fn(),
  pathExists: jest.fn()
}

jest.unstable_mockModule('fs-extra', () => ({ default: mockFs }))

const { compileTemplate } = await import('../src/compile-template.js')

const TEMPLATE_DIR = '/templates/wallet'
const TARGET_DIR = '/output/wdk-wallet-stellar'
const TEMPLATE_CONTEXT = {
  PACKAGE_NAME: 'wdk-wallet-stellar',
  MODULE_NAME: 'wdk-wallet-stellar',
  NAME: 'stellar',
  DESCRIPTION: 'WDK module to create and manage BIP-32 wallets for the stellar blockchain.',
  YEAR: '2025',
  AUTHOR: 'Tether',
  PACKAGE_MANAGER: 'npm'
}

function createDirent (name, isDir) {
  return { name, isDirectory: () => isDir, isFile: () => !isDir }
}

describe('compileTemplate', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should replace placeholders in file paths', async () => {
    mockFs.readdir.mockResolvedValue([createDirent('wallet-manager-{{NAME}}.js', false)])
    mockFs.readFile.mockResolvedValue('')

    await compileTemplate({ templateDir: TEMPLATE_DIR, targetDir: TARGET_DIR, context: TEMPLATE_CONTEXT})

    expect(mockFs.writeFile).toHaveBeenCalledWith(
      '/output/wdk-wallet-stellar/wallet-manager-stellar.js',
      ''
    )
  })

  test('should replace placeholders in file content when copying text files', async () => {
    mockFs.readdir.mockResolvedValue([createDirent('index.js', false)])
    mockFs.readFile.mockResolvedValue('module: {{MODULE_NAME}}, class: {{pascalCase NAME}}')

    await compileTemplate({ templateDir: TEMPLATE_DIR, targetDir: TARGET_DIR, context: TEMPLATE_CONTEXT})

    expect(mockFs.writeFile).toHaveBeenCalledWith(
      '/output/wdk-wallet-stellar/index.js',
      'module: wdk-wallet-stellar, class: Stellar'
    )
  })

  test('should recurse into nested directories', async () => {
    mockFs.readdir
      .mockResolvedValueOnce([
        createDirent('src', true),
      ])
      .mockResolvedValueOnce([createDirent('main.js', false)])
    mockFs.readFile.mockResolvedValue('content')

    await compileTemplate({ templateDir: TEMPLATE_DIR, targetDir: TARGET_DIR, context: TEMPLATE_CONTEXT})

    expect(mockFs.readdir).toHaveBeenCalledTimes(2)
    expect(mockFs.readdir).toHaveBeenCalledWith('/templates/wallet', { withFileTypes: true })
    expect(mockFs.readdir).toHaveBeenCalledWith('/templates/wallet/src', { withFileTypes: true })
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      '/output/wdk-wallet-stellar/src/main.js',
      'content'
    )
  })
})
