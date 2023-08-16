import express from 'express';
import swaggerUi from 'swagger-ui-express';

import * as fs from 'fs';
import * as yaml from 'js-yaml';

import dotenv from 'dotenv';
dotenv.config()

import routerv1 from './src/routerv1';


function parseOpenAPISpec(file: string): any {
  const yamlContent = fs.readFileSync(file, 'utf8');
  const parsedData = yaml.load(yamlContent);
  return parsedData;
}

// Replace 'openapi.yaml' with the path to your OpenAPI YAML file
const app = express();

// Serve the Swagger UI at /api-docs
const openApiSpec = parseOpenAPISpec('openapi.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.use('/v1', routerv1);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
