import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const emailVerication = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "El correo es obligatorio." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }
    res.status(200).json({ message: "Correo disponible." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error del servidor.", error: error.message });
  }
};

const saveUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, birthdate } = req.body;

    // Validar que todos los campos estén presentes
    if (!firstname || !lastname || !email || !password || !birthdate) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios." });
    }

    // Validar firstname y lastname
    const nameRegex = /^[a-zA-Z]{1,20}$/; // Solo letras, máximo 20 caracteres
    if (!nameRegex.test(firstname)) {
      return res.status(400).json({
        message:
          "El nombre solo debe contener letras y tener máximo 20 caracteres.",
      });
    }
    if (!nameRegex.test(lastname)) {
      return res.status(400).json({
        message:
          "El apellido solo debe contener letras y tener máximo 20 caracteres.",
      });
    }

    // Validar formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato básico de email
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "El correo electrónico no tiene un formato válido.",
      });
    }

    // Validar contraseña
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial.",
      });
    }

    // Validar que el usuario sea mayor de 18 años
    const birthDate = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      return res
        .status(400)
        .json({ message: "Debes ser mayor de 18 años para registrarte." });
    }

    // Crear y guardar el usuario
    const user = new User({ firstname, lastname, email, password, birthdate });
    await user.save();

    res.status(201).json({ message: "Usuario creado exitosamente.", user });
  } catch (error) {
    console.error("Error capturado:", error); // Registrar el error completo para diagnóstico
    if (error.code === 11000 && error.message.includes("email")) {
      return res
        .status(400)
        .json({ message: "El correo electrónico ya está registrado." });
    }

    if (error.name === "ValidationError") {
      // Manejar errores de validación de Mongoose
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Error de validación.", errors });
    }

    res
      .status(500)
      .json({ message: "Error del servidor.", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//controlador para actualzar un usuario
const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, birthdate, password } = req.body;

    // Validaciones
    const nameRegex = /^[a-zA-Z]{1,20}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Validar firstname
    if (firstname && !nameRegex.test(firstname)) {
      return res.status(400).json({
        message: "El nombre debe tener solo letras y máximo 20 caracteres.",
      });
    }

    // Validar lastname
    if (lastname && !nameRegex.test(lastname)) {
      return res.status(400).json({
        message: "El apellido debe tener solo letras y máximo 20 caracteres.",
      });
    }

    // Validar birthdate
    if (birthdate) {
      const birthDateObj = new Date(birthdate);
      const today = new Date();
      const age = today.getFullYear() - birthDateObj.getFullYear();
      const monthDiff = today.getMonth() - birthDateObj.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        return res
          .status(400)
          .json({ message: "El usuario debe tener al menos 18 años." });
      }
    }

    // Validar password
    let updatedPassword = null;
    if (password) {
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message:
            "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial.",
        });
      }

      // Hashear el password
      const salt = await bcrypt.genSalt(10);
      updatedPassword = await bcrypt.hash(password, salt);
    }

    // Actualizar el usuario
    const updateData = {
      ...req.body,
      ...(updatedPassword && { password: updatedPassword }),
    };

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/*
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/
/*
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id, {
      deletedAt: Date.now(),
    });
    res.json(user);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario emininado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
*/
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Buscar el usuario por ID
    if (!user) {
      // Si no se encuentra el usuario, devolver una respuesta de error
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await User.findByIdAndDelete(req.params.id); // Eliminar el usuario
    res.json({ message: "Usuario eliminado correctamente" }); // Responder con éxito
  } catch (error) {
    res.status(500).json({ message: error.message }); // Manejar errores
  }
};

export {
  saveUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  emailVerication,
};
