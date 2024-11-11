import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pameleon:leito.2011@krugerbackend.cx5kf.mongodb.net/flatfinder?retryWrites=true&w=majority&appName=KrugerBackend"
    );
    console.log("**Conexion exitosa**");
  } catch (error) {
    console.error("**Error al conectar la base de datos**", error);
  }
};
