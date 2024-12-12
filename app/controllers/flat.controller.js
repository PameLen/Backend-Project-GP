import { Flat } from "../models/flat.model.js";
import { User } from "../models/user.model.js";

//controllador para obtner todos los flats
const getAllFlats = async (req, res) => {
  try {
    const userId = req.user.user_id; // Asegúrate de obtener el user_id del token
    const flats = await Flat.find();

    const flatsWithFavouriteStatus = flats.map((flat) => ({
      ...flat.toObject(),
      isFavourite: flat.users.some(
        (userEntry) => userEntry.flat.toString() === userId
      ),
    }));

    // res.json(flats);
    res.status(200).json(flatsWithFavouriteStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//controllador para que el propietaro cree un nuevo flats
const addFlat = async (req, res) => {
  try {
    // Obtenemos el ID del propietario del token (rellenado por el middleware de autenticación)
    const ownerId = req.user?.user_id;

    if (!ownerId) {
      return res.status(401).send({ message: "User not authenticated" });
    }

    // Creamos un nuevo flat con el campo ownerId incluido
    const flat = new Flat({
      ...req.body, // Los datos enviados en el cuerpo de la solicitud
      ownerId, // El ID del propietario obtenido del token
    });

    await flat.save(); // Guardamos el flat en la base de datos
    res.status(201).send(flat); // Enviamos la respuesta al cliente
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

//controllador para que el propietaro actualizar un nuevo flats
const updateFlat = async (req, res) => {
  try {
    // Obtener el flat de la base de datos
    const flat = await Flat.findById(req.params.id);

    if (!flat) {
      return res.status(404).json({ message: "Flat no encontrado" });
    }

    // Validar si el usuario logueado es el dueño del flat
    if (flat.ownerId.toString() !== req.user.user_id) {
      return res.status(403).json({
        message: "Access denied: Solo el dueño puede actualizar este flat.",
      });
    }

    // Actualizar el flat si el usuario es el dueño
    const updatedFlat = await Flat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedFlat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//controlador para que obtener un flat por id
const getFlatById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el flat y poblar los detalles del ownerId
    const flat = await Flat.findById(id).populate({
      path: "ownerId",
      select: "email", // Solo selecciona el campo email del propietario
    });

    if (!flat) {
      return res.status(404).json({ message: "Flat no encontrado" });
    }

    // Construir la respuesta con los detalles del flat y el email del propietario
    const response = {
      flatDetails: {
        city: flat.city,
        streetName: flat.streetName,
        streetNumber: flat.streetNumber,
        areaSize: flat.areaSize,
        hasAc: flat.hasAc,
        yearBuilt: flat.yearBuilt,
        rentPrice: flat.rentPrice,
        dateAvailable: flat.dateAvailable,
        created: flat.created,
        updated: flat.updated,
      },
      ownerEmail: flat.ownerId.email,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving flat", error });
  }
};

//controlador para eliminar un flat

const deleteFlat = async (req, res) => {
  try {
    // Obtener el flat de la base de datos
    const flat = await Flat.findById(req.params.id);

    if (!flat) {
      return res.status(404).json({ message: "Flat no encontrado" });
    }

    // Validar si el usuario logueado es el dueño del flat
    if (flat.ownerId.toString() !== req.user.user_id) {
      return res.status(403).json({
        message: "Access denied: Solo el dueño puede eliminar este flat.",
      });
    }

    // Eliminar el flat si el usuario es el dueño
    await Flat.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Flat eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { getAllFlats, addFlat, updateFlat, getFlatById, deleteFlat };
