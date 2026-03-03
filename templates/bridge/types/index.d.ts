export { default } from "./src/{{NAME}}-protocol-{{BLOCKCHAIN}}.js";
export type BridgeOptions = import("@tetherto/wdk-wallet/protocols").BridgeOptions;
export type BridgeResult = import("@tetherto/wdk-wallet/protocols").BridgeResult;
export type {{pascalCase NAME}}ProtocolConfig = import("./src/{{NAME}}-protocol-{{BLOCKCHAIN}}.js").{{pascalCase NAME}}ProtocolConfig;
