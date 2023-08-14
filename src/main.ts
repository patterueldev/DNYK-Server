import express from 'express';
import swaggerUi from 'swagger-ui-express';

import * as fs from 'fs';
import * as yaml from 'js-yaml';

function parseOpenAPISpec(file: string): any {
  const yamlContent = fs.readFileSync(file, 'utf8');
  const parsedData = yaml.load(yamlContent);
  return parsedData;
}

// Replace 'openapi.yaml' with the path to your OpenAPI YAML file
const openApiSpec = parseOpenAPISpec('openapi.yaml');
console.log(openApiSpec);

const app = express();

// Serve the Swagger UI at /api-docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// Add other routes and middleware as needed

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
