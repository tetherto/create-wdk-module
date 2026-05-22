// Copyright {{YEAR}} {{AUTHOR}}
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

/** @typedef {import('@tetherto/wdk-wallet/protocols').SwapOptions} SwapOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SwapResult} SwapResult */

/** @typedef {import('@tetherto/wdk-wallet/protocols').BridgeOptions} BridgeOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').BridgeResult} BridgeResult */

/** @typedef {import('@tetherto/wdk-wallet/protocols').SwidgeStatus} SwidgeStatus */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SwidgeFeeType} SwidgeFeeType */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SwidgeProtocolConfig} SwidgeProtocolConfig */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SwidgeOptions} SwidgeOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SwidgeCommonOptions} SwidgeCommonOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SwidgeExactInOptions} SwidgeExactInOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SwidgeExactOutOptions} SwidgeExactOutOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SwidgeFee} SwidgeFee */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SwidgeTransaction} SwidgeTransaction */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SwidgeQuote} SwidgeQuote */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SwidgeResult} SwidgeResult */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SwidgeStatusOptions} SwidgeStatusOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SwidgeStatusResult} SwidgeStatusResult */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SwidgeSupportedChain} SwidgeSupportedChain */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SwidgeSupportedToken} SwidgeSupportedToken */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SwidgeSupportedTokensOptions} SwidgeSupportedTokensOptions */

/** @typedef {import('./src/{{NAME}}-protocol.js').{{pascalCase NAME}}ProtocolConfig} {{pascalCase NAME}}ProtocolConfig */

export { default } from './src/{{NAME}}-protocol.js'
