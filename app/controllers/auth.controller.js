import { User } from "../models/user.model.js";

import crypto from "crypto";

//cpontrolador para registrar el usuario

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

export { register };
