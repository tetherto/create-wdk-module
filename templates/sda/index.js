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

/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaToken} SdaToken */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaDepositAddressLimits} SdaDepositAddressLimits */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaRoutesOptions} SdaRoutesOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaRoute} SdaRoute */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaDepositOptions} SdaDepositOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaFeeType} SdaFeeType */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaFee} SdaFee */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaDepositQuote} SdaDepositQuote */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaCreateDepositAddressOptions} SdaCreateDepositAddressOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaDepositAddress} SdaDepositAddress */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaTransferStatus} SdaTransferStatus */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaTransfer} SdaTransfer */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaTransfersOptions} SdaTransfersOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaRecoverById} SdaRecoverById */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaRecoverByAddress} SdaRecoverByAddress */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaRecoveryOptions} SdaRecoveryOptions */
/** @typedef {import('@tetherto/wdk-wallet/protocols').SdaRecoveryResult} SdaRecoveryResult */

/** @typedef {import('./src/{{NAME}}-protocol.js').{{pascalCase NAME}}ProtocolConfig} {{pascalCase NAME}}ProtocolConfig */

export { default } from './src/{{NAME}}-protocol.js'
