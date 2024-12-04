import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0", // Especificación de OpenAPI
  info: {
    title: "FlantFinder", // Título del proyecto
    version: "1.0.0", // Versión
    description: "Documentación de la API FlatFinder",
  },
  servers: [
    {
      url: "http://localhost:8080", // URL base de tu API
      description: "Servidor de desarrollo",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Token de autenticación JWT",
      },
    },
  },

  security: {
    bearerAuth: [],
  },
};

const options = {
  swaggerDefinition,
  apis: [
    "./routes/auth.router.js",
    "./routes/user.router.js",
    "./routes/message.router.js",
    "./routes/flat.router.js",
  ], // Archivos donde se documentarán las rutas
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
