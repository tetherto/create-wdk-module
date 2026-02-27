export { default } from "./src/{{NAME}}-protocol-{{BLOCKCHAIN}}.js";
export type SwapOptions = import("@tetherto/wdk-wallet/protocols").SwapOptions;
export type SwapResult = import("@tetherto/wdk-wallet/protocols").SwapResult;
export type {{pascalCase NAME}}ProtocolConfig = import("./src/{{NAME}}-protocol-{{BLOCKCHAIN}}.js").{{pascalCase NAME}}ProtocolConfig;
