const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Access Map Doc',
    },
    schemes: ['http', 'https'],
    components: {
      securitySchemes: {
          bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
          }
      }
  },
  security: [{
      bearerAuth: []
  }]
    
  },
  apis: ['./src/v1/routes/*.js' , './src/index.js'], // Ruta a los archivos que contienen las rutas de tu API
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
