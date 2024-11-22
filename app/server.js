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
import configs from "./configs/configs.js";
import flatsRoutes from "./routes/flat.router.js";
import usersRoutes from "./routes/user.router.js";
import authRoutes from "./routes/auth.router.js";

const app = express();

//middleware para procesar json
app.use(express.json());

connectDB();
//EndPoints para servicios register y login
app.use("/users", authRoutes);

//EndPoint para servicios users
app.use("/users", usersRoutes);
//EndPoint para servicios flats
app.use("/flats", flatsRoutes);

app.listen(configs.PORT, () => {
  console.log(`Servidor iniciado en el puerto ${configs.PORT} `);
});
