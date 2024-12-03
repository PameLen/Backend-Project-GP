import { Message } from "../models/message.model.js";

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({ flatId: req.params.id });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      flatId: req.params.id,
      senderId: req.params.senderId,
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*const addMessage = async (req, res) => {
  try {
    const flatId = req.params.id; // Obtener el ID del flat desde los parámetros de la ruta
    const { content, senderId } = req.body; // Extraer el contenido y el ID del remitente desde el cuerpo de la solicitud

    // Crear el mensaje directamente con los datos proporcionados
    const message = new Message({
      content,
      flatId,
      senderId,
    });

    await message.save(); // Guardar el mensaje en la base de datos

    res.status(201).json(message); // Responder con el mensaje creado
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/

const addMessage = async (req, res) => {
  try {
    const flatId = req.params.id; // ID del flat desde los parámetros de la ruta
    const { content } = req.body; // Extraer el contenido desde el cuerpo de la solicitud
    const loggedUserId = req.user.id; // Obtener el ID del usuario logueado (asumiendo que está en req.user)

    // Validar si el flat existe
    const flat = await Flat.findById(flatId);
    if (!flat) {
      return res.status(404).json({ message: "Flat no encontrado" });
    }

    // Validar si el usuario está logueado
    if (!loggedUserId) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    // Crear el mensaje
    const message = new Message({
      content,
      flatId,
      senderId: loggedUserId,
    });

    await message.save(); // Guardar el mensaje en la base de datos

    res.status(201).json(message); // Responder con el mensaje creado
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllMessages, getUserMessages, addMessage };
