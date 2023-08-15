"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fs = __importStar(require("fs"));
const yaml = __importStar(require("js-yaml"));
const routerv1_1 = __importDefault(require("./src/routerv1"));
function parseOpenAPISpec(file) {
    const yamlContent = fs.readFileSync(file, 'utf8');
    const parsedData = yaml.load(yamlContent);
    return parsedData;
}
// Replace 'openapi.yaml' with the path to your OpenAPI YAML file
const app = (0, express_1.default)();
// Serve the Swagger UI at /api-docs
const openApiSpec = parseOpenAPISpec('openapi.yaml');
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openApiSpec));
app.use('/v1', routerv1_1.default);
// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
