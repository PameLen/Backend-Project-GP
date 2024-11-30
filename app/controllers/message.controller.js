import { Message } from "../models/message.model.js";
import { Flat } from "../models/flat.model.js";

//Controlador para consultar los mensaje de un user, se valida con el token id del login solo si es igual a senderId
const getUserMessages = async (req, res) => {
  try {
    // Obtener el ID del flat y el senderId de los parámetros de la ruta
    const { id: flatId, senderId } = req.params;

    // Obtener el ID del usuario logueado desde el token
    const loggedUserId = req.user.user_id;

    // Validar que el senderId coincida con el ID del usuario logueado
    if (senderId !== loggedUserId) {
      return res.status(403).json({
        message: "Acceso denegado: No puedes ver mensajes de otro usuario.",
      });
    }

    // Buscar el flat y validar si existe
    const flat = await Flat.findById(flatId).populate("messages");
    if (!flat) {
      return res.status(404).json({ message: "Flat no encontrado." });
    }

    // Filtrar los mensajes que coincidan con el senderId
    const userMessages = flat.messages.filter(
      (message) => message.senderId.toString() === senderId
    );

    // Responder con los mensajes del usuario
    res.status(200).json(userMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//controlador para consultar todos los mensajes de un flat, se valida solo si el dueno del flat
const getAllMessages = async (req, res) => {
  try {
    // Obtener el ID del flat desde los parámetros de la ruta
    const { id: flatId } = req.params;

    // Obtener el ID del usuario logueado desde el token (req.user lo llena el middleware)
    const loggedUserId = req.user.user_id;

    // Buscar el flat en la base de datos
    const flat = await Flat.findById(flatId).populate("messages");

    // Validar si el flat existe
    if (!flat) {
      return res.status(404).json({ message: "Flat no encontrado." });
    }

    // Validar que el usuario logueado sea el propietario del flat
    if (flat.ownerId.toString() !== loggedUserId) {
      return res.status(403).json({
        message: "Acceso denegado: Solo el propietario puede ver los mensajes.",
      });
    }

    // Enviar los mensajes asociados al flat
    res.status(200).json(flat.messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//controlador para que el usuario loguedo ingrese un mensjae a un flat que se ingresa en la ruta
const addMessage = async (req, res) => {
  try {
    // Obtener el ID del flat desde los parámetros de la ruta
    const { id: flatId } = req.params;

    // Obtener el contenido del mensaje desde el cuerpo de la solicitud
    const { content } = req.body;

    // Obtener el ID del usuario logueado desde el token
    const senderId = req.user.user_id;

    // Validar que el contenido del mensaje exista
    if (!content) {
      return res
        .status(400)
        .json({ message: "El contenido del mensaje es requerido." });
    }

    // Crear el mensaje en la base de datos
    const message = new Message({
      senderId,
      flatId,
      content,
    });
    await message.save();

    // Buscar el flat en la base de datos
    const flat = await Flat.findById(flatId);

    // Validar si el flat existe
    if (!flat) {
      return res.status(404).json({ message: "Flat no encontrado." });
    }

    // Asociar el mensaje al flat
    if (!flat.messages) {
      flat.messages = []; // Inicializar el array si está undefined
    }
    flat.messages.push(message._id);

    // Guardar el flat con la referencia al mensaje
    await flat.save();

    // Responder con éxito
    res.status(201).json({ message: "Mensaje agregado correctamente." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getUserMessages, getAllMessages, addMessage };
