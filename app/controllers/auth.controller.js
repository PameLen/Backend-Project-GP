import config from "../configs/config.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

//controlador para registrar el usuario

const register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    // user.password = undefined;
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
      return res.status(404).json({ message: "User not found" });
    }
    //3.- Vamos a comparar la contraseña que viene en el request con la contraseña hasheada que tenemos en la BDD
    const passwordsMatch = await user.comparePasswords(password);
    //4.- Si las contraseñas no coinciden, vamos a retornar un 401
    if (!passwordsMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    //5.- Si las contraseñas coinciden, vamos a generar un token JWT y lo vamos a retornar en la respuesta

    const token = await jwt.sign(
      { user_id: user._id, isAdmin: user.isAdmin },
      config.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log("Generated JWT Token:", token);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: error.message });
  }
};
export { register, login };
