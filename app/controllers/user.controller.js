// implementar la funcion getAllUsers, getUserById, updateUser, deleteUser
//Buenas practicas a tomar en cuenta
//1. Siempre usar try y catch para manejar errores
//2. Cuando hay un error, retornar codigo 500 internal server error
//3. Siempre retornar el codigo de estado correspondiente:
//200 - OK cuando todo va bien
//201 - Created cuando se crea un nuevo recurso
//404 - Not Found cuando no se encuentra el recurso
//500 - Internal Server Error cuando ocurre un error en el servidor
//400 - Bad Request cuando hay un error en el request
// Siempre registrar un evento de error cada vez que ingresen al catch (loggers)

import { User } from "../models/user.model.js";

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
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id, {
      deletedAt: Date.now(),
    });
    res.json(user);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, getUserById, updateUser, deleteUser };
