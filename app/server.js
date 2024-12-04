//Este archivo debemos tener las configuraciones iniciales de nuestro proyecto
/*
1. Creacion del servidor con express para levantarlo en un puerto especifico
2. Definicion de cada uno de los grupos de rutas que van a manejar en el proyecto
2.1. /users /flats /messages
3. Llamar a nuestro archivo de conexion a la base de datos
4. Podemos agregar un middleware global => cors
5. El server se comunica con la capa de ruteo (routes)
*/
import express from "express";
import { connectDB } from "./db/db.js";
import config from "./configs/config.js";
import flatsRoutes from "./routes/flat.router.js";
import usersRoutes from "./routes/user.router.js";
import authRoutes from "./routes/auth.router.js";
import messageRoutes from "./routes/message.router.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig.js";

const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Montar la interfaz de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conectar a la base de datos
connectDB();

// EndPoints para servicios register y login
app.use("/users", authRoutes);
// EndPoint para servicios users
app.use("/users", usersRoutes);
// EndPoint para servicios flats
app.use("/flats", flatsRoutes);
// EndPoint para mensajes
app.use("/flats", messageRoutes);

// Iniciar el servidor
app.listen(config.PORT, () => {
  console.log(`Servidor iniciado en el puerto ${config.PORT}`);
  console.log(`Documentación en http://localhost:${config.PORT}/api-docs`);
});
