// Copyright 2024 Tether Operations Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @typedef {'wallet' | 'swap' | 'bridge' | 'lending' | 'fiat'} ModuleType
 */

/**
 * @typedef {Object} ModuleConfig
 * @property {ModuleType} type The module type identifier.
 * @property {string} prefix The package name prefix.
 * @property {string} namingPattern The naming pattern template for the package.
 * @property {boolean} requiresBlockchain Whether the module requires a blockchain argument.
 * @property {string} basePackage The base WDK package dependency.
 * @property {string[]} keywords The npm keywords for the package.
 */

/** @type {Record<ModuleType, ModuleConfig>} */
export const MODULE_CONFIGS = {
  wallet: {
    type: 'wallet',
    prefix: 'wdk-wallet-',
    namingPattern: 'wdk-wallet-{chain}',
    requiresBlockchain: false,
    basePackage: '@tetherto/wdk-wallet',
    keywords: ['wdk', 'wallet', 'bip-32']
  },
  swap: {
    type: 'swap',
    prefix: 'wdk-protocol-swap-',
    namingPattern: 'wdk-protocol-swap-{name}-{chain}',
    requiresBlockchain: true,
    basePackage: '@tetherto/wdk-wallet',
    keywords: ['wdk', 'swap', 'dex', 'defi']
  },
  bridge: {
    type: 'bridge',
    prefix: 'wdk-protocol-bridge-',
    namingPattern: 'wdk-protocol-bridge-{name}-{chain}',
    requiresBlockchain: true,
    basePackage: '@tetherto/wdk-wallet',
    keywords: ['wdk', 'bridge', 'cross-chain']
  },
  lending: {
    type: 'lending',
    prefix: 'wdk-protocol-lending-',
    namingPattern: 'wdk-protocol-lending-{name}-{chain}',
    requiresBlockchain: true,
    basePackage: '@tetherto/wdk-wallet',
    keywords: ['wdk', 'lending', 'defi']
  },
  fiat: {
    type: 'fiat',
    prefix: 'wdk-protocol-fiat-',
    namingPattern: 'wdk-protocol-fiat-{provider}',
    requiresBlockchain: false,
    basePackage: '@tetherto/wdk-wallet',
    keywords: ['wdk', 'fiat', 'on-ramp', 'off-ramp']
  }
}
