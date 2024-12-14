import { Message } from "../models/message.model.js";
import { Flat } from "../models/flat.model.js";
import { User } from "../models/user.model.js";

//Controlador para consultar los mensajes de un user, se valida con el token id del login solo si es igual a senderId
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
    const flat = await Flat.findById(flatId).populate({
      path: "messages",
      populate: { path: "senderId", select: "email" }, // Incluye el email del usuario en los mensajes
    });

    if (!flat) {
      return res.status(404).json({ message: "Flat no encontrado." });
    }

    // Filtrar los mensajes que coincidan con el senderId
    const userMessages = flat.messages.filter(
      (message) => message.senderId._id.toString() === senderId
    );

    // Construir la respuesta incluyendo los detalles del flat y los mensajes
    const response = {
      flatDetails: {
        city: flat.city,
        streetName: flat.streetName,
        streetNumber: flat.streetNumber,
      },
      messages: userMessages.map((message) => ({
        content: message.content,
        senderEmail: message.senderId.email,
        createdAt: message.createdAt,
      })),
    };

    // Responder con los mensajes del usuario y los detalles del flat
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//controlador para consultar todos los mensajes de un flat, se valida solo si el dueno del flat
const getAllMessages = async (req, res) => {
  try {
    // Obtener el id del flat desde los parámetros
    const { id: flatId } = req.params;

    // Validar que el flat existe
    const flat = await Flat.findById(flatId);
    if (!flat) {
      return res.status(404).json({ message: "Flat no encontrado" });
    }

    // Verificar que el usuario logueado es el propietario del flat
    if (flat.ownerId.toString() !== req.user.user_id) {
      return res
        .status(403)
        .json({ message: "Access denied: No eres el propietario del flat" });
    }

    // Obtener todos los mensajes asociados al flat con información adicional
    const messages = await Message.find({ flatId })
      .populate("senderId", "email") // Obtener el email del usuario que envió el mensaje
      .populate("flatId", "city streetName streetNumber"); // Obtener los detalles del flat

    // Construir la respuesta con los mensajes enriquecidos
    const response = messages.map((message) => ({
      messageId: message._id,
      senderEmail: message.senderId?.email, // Email del remitente
      flatDetails: {
        city: message.flatId?.city,
        streetName: message.flatId?.streetName,
        streetNumber: message.flatId?.streetNumber,
      },
      content: message.content,
      created: message.created,
    }));

    // Enviar la respuesta
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//controlador para que el usuario loguedo ingrese un mensjae a un flat que se ingresa en la ruta
const addMessage = async (req, res) => {
  try {
    // Obtener el id del flat desde los parámetros
    const { id: flatId } = req.params;

    // Obtener el id del usuario logueado desde el token
    const userId = req.user.user_id;

    // Obtener el contenido del mensaje desde el cuerpo de la solicitud
    const { content } = req.body;

    // Validar que el flat existe
    const flat = await Flat.findById(flatId);
    if (!flat) {
      return res.status(404).json({ message: "Flat no encontrado" });
    }

    // Crear el mensaje en la base de datos con flatId
    const message = new Message({
      senderId: userId,
      flatId, // Asociamos el ID del flat al mensaje
      content,
    });
    await message.save();

    // Asociar el mensaje al flat
    flat.messages.push(message._id);
    await flat.save();

    // Obtener el email del usuario logueado
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Construir la respuesta
    const response = {
      message: "Mensaje agregado",
      email: user.email,
      flatDetails: {
        city: flat.city,
        streetName: flat.streetName,
        streetNumber: flat.streetNumber,
      },
      messageDetails: {
        content: message.content,
        createdAt: message.createdAt,
      },
    };

    // Enviar la respuesta
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { getUserMessages, getAllMessages, addMessage };
