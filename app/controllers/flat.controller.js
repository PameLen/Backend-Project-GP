import { Flat } from "../models/flat.model.js";

//controllador para obtner todos los flats
const getAllFlats = async (req, res) => {
  try {
    const flats = await Flat.find();
    res.json(flats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//controllador para que el propietaro cree un nuevo flats
const addFlat = async (req, res) => {
  try {
    const flat = new Flat(req.body);
    await flat.save();
    res.status(201).send(flat);
  } catch (error) {
    res.status(400).send(error);
  }
};

//controllador para que el propietaro actualizar un nuevo flats
const updateFlat = async (req, res) => {
  try {
    const flat = await Flat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!flat) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.json(flat);
  } catch (error) {
    res.status(400).send(error);
  }
};

//controlador para que obtener un flat por id
const getFlatById = async (req, res) => {
  try {
    const { id } = req.params;
    const flat = await Flat.findById(id);
    if (!flat) {
      return res.status(404).json({ message: "Flat not found" });
    }
    res.json(flat);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving flat", error });
  }
};
export { getAllFlats, addFlat, updateFlat, getFlatById };
