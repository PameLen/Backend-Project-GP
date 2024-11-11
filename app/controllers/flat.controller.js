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

export { getAllFlats, addFlat };
