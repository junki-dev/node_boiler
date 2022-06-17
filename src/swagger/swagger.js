const swaggerAutogen = require('swagger-autogen')();

const outputFile = './src/swagger/swagger-output.json';
const endpointsFiles = ['./src/app.ts'];
const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:1234',
  schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
