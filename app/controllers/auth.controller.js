import config from "../configs/config.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

//controlador para registrar el usuario

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, birthdate } = req.body;

    // Validar que todos los campos estén presentes
    if (!firstname || !lastname || !email || !password || !birthdate) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios." });
    }

    // Validar firstname y lastname
    const nameRegex = /^[a-zA-Z]{1,20}$/;
    if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
      return res.status(400).json({
        message:
          "El nombre y apellido deben tener entre 1 y 20 caracteres, solo letras.",
      });
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "El correo electrónico no es válido." });
    }

    // Validar contraseña
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial (incluyendo '.').",
      });
    }

    // Validar que el usuario sea mayor de 18 años
    const birthDate = new Date(birthdate);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    if (
      age < 18 ||
      (age === 18 &&
        currentDate <
          new Date(birthDate.setFullYear(birthDate.getFullYear() + 18)))
    ) {
      return res.status(400).json({ message: "Debes tener al menos 18 años." });
    }

    // Verificar si el correo ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El correo electrónico ya está registrado." });
    }

    // Crear y guardar el usuario
    const user = new User({ firstname, lastname, email, password, birthdate });
    await user.save();

    res.status(201).json({ message: "Usuario registrado exitosamente.", user });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Error de validación.", errors });
    }

    // Manejar error de duplicado (E11000)
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "El correo electrónico ya está registrado." });
    }

    res
      .status(500)
      .json({ message: "Error del servidor.", error: error.message });
  }
};

//controlador para loguear usuario
const login = async (req, res) => {
  try {
    //1.- Vamos a obtener las credenciales (email, password) del request
    const { email, password } = req.body;
    //2.- Vamos a buscar el usuario en la BDD, si no existe vamos a retornar un 404
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    //3.- Vamos a comparar la contraseña que viene en el request con la contraseña hasheada que tenemos en la BDD
    const passwordsMatch = await user.comparePasswords(password);
    //4.- Si las contraseñas no coinciden, vamos a retornar un 401
    if (!passwordsMatch) {
      return res.status(401).json({ message: "Credenciales Invalidas" });
    }
    //5.- Si las contraseñas coinciden, vamos a generar un token JWT y lo vamos a retornar en la respuesta

    const token = await jwt.sign(
      { user_id: user._id, firstname: user.firstname, isAdmin: user.isAdmin },
      config.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    //console.log("Generated JWT Token:", token);

    res.status(200).json({ token, firstname: user.firstname });
  } catch (error) {
    //console.error("Error during login:", error.message);
    res.status(500).json({ message: error.message });
  }
};
export { register, login };
