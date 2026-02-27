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

const { copyTemplate, copyCommonFiles } = await import('../src/helpers/copy.js')

const TEMPLATE_DIR = '/templates/wallet'
const TARGET_DIR = '/output/wdk-wallet-stellar'
const TEMPLATE_CONTEXT = {
  PACKAGE_NAME: 'wdk-wallet-stellar',
  CLASS_NAME: 'Stellar',
  CLASS_NAME_LOWER: 'stellar',
  MODULE_NAME: 'wdk-wallet-stellar',
  BLOCKCHAIN: 'stellar',
  DESCRIPTION: 'Stellar wallet module for WDK',
  YEAR: '2025',
  AUTHOR: 'Tether'
}

function createDirent (name, isDir) {
  return { name, isDirectory: () => isDir, isFile: () => !isDir }
}

describe('copyTemplate', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should replace placeholders in file content when copying text files', async () => {
    mockFs.readdir.mockResolvedValue([createDirent('index.js', false)])
    mockFs.readFile.mockResolvedValue('module: {{PACKAGE_NAME}}, class: {{pascalCase NAME}}')

    await copyTemplate(TEMPLATE_DIR, TARGET_DIR, TEMPLATE_CONTEXT)

    expect(mockFs.writeFile).toHaveBeenCalledWith(
      '/output/wdk-wallet-stellar/index.js',
      'module: wdk-wallet-stellar, class: Stellar'
    )
  })

  test('should replace placeholders in file paths', async () => {
    mockFs.readdir.mockResolvedValue([createDirent('{{NAME}}-provider.js', false)])
    mockFs.readFile.mockResolvedValue('')

    await copyTemplate(TEMPLATE_DIR, TARGET_DIR, TEMPLATE_CONTEXT)

    expect(mockFs.writeFile).toHaveBeenCalledWith(
      '/output/wdk-wallet-stellar/stellar-provider.js',
      ''
    )
  })

  test('should copy binary files without processing content', async () => {
    mockFs.readdir.mockResolvedValue([createDirent('logo.png', false)])

    await copyTemplate(TEMPLATE_DIR, TARGET_DIR, TEMPLATE_CONTEXT)

    expect(mockFs.copy).toHaveBeenCalledWith(
      '/templates/wallet/logo.png',
      '/output/wdk-wallet-stellar/logo.png'
    )
    expect(mockFs.readFile).not.toHaveBeenCalled()
  })

  test('should recurse into nested directories and skip .git', async () => {
    mockFs.readdir
      .mockResolvedValueOnce([
        createDirent('src', true),
        createDirent('.git', true)
      ])
      .mockResolvedValueOnce([createDirent('main.js', false)])
    mockFs.readFile.mockResolvedValue('content')

    await copyTemplate(TEMPLATE_DIR, TARGET_DIR, TEMPLATE_CONTEXT)

    expect(mockFs.readdir).toHaveBeenCalledTimes(2)
    expect(mockFs.readdir).toHaveBeenCalledWith('/templates/wallet', { withFileTypes: true })
    expect(mockFs.readdir).toHaveBeenCalledWith('/templates/wallet/src', { withFileTypes: true })
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      '/output/wdk-wallet-stellar/src/main.js',
      'content'
    )
  })

  test('should preserve unmatched placeholders in content', async () => {
    mockFs.readdir.mockResolvedValue([createDirent('file.txt', false)])
    mockFs.readFile.mockResolvedValue('{{UNKNOWN_KEY}} and {{pascalCase NAME}}')

    await copyTemplate(TEMPLATE_DIR, TARGET_DIR, TEMPLATE_CONTEXT)

    expect(mockFs.writeFile).toHaveBeenCalledWith(
      '/output/wdk-wallet-stellar/file.txt',
      '{{UNKNOWN_KEY}} and Stellar'
    )
  })
})

describe('copyCommonFiles', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should delegate to copyTemplate when the common directory exists', async () => {
    mockFs.pathExists.mockResolvedValue(true)
    mockFs.readdir.mockResolvedValue([createDirent('LICENSE', false)])
    mockFs.readFile.mockResolvedValue('Copyright {{YEAR}}')

    await copyCommonFiles('/templates/common', TARGET_DIR, TEMPLATE_CONTEXT)

    expect(mockFs.pathExists).toHaveBeenCalledWith('/templates/common')
    expect(mockFs.ensureDir).toHaveBeenCalled()
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      '/output/wdk-wallet-stellar/LICENSE',
      'Copyright 2025'
    )
  })

  test('should skip copying when the common directory does not exist', async () => {
    mockFs.pathExists.mockResolvedValue(false)

    await copyCommonFiles('/templates/nonexistent', TARGET_DIR, TEMPLATE_CONTEXT)

    expect(mockFs.readdir).not.toHaveBeenCalled()
    expect(mockFs.writeFile).not.toHaveBeenCalled()
  })
})
