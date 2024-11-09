import mongoose from "mongoose";

//Definir el schema de la db para la coleccion de usuarios

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Date,
  },
  favouritesFlats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "flat",
    },
  ],
});

//El proyecto dice que hagan un borrado fisico, es recomedable hacer un borrado logico

export const User = mongoose.model("User", userSchema);
