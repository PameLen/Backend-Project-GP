/*
getAllFlats /flats GET
updateFlat /flats PATCH flat owner
(dueño del
departamento)
deleteFlat /flats DELETE flat owner
addFlat /flats POST flat owner
función ruta método http permisos
getFlatById /flats/:id GET
*/
import express from "express";
import {
  getAllFlats,
  addFlat,
  getFlatById,
  updateFlat,
  deleteFlat,
} from "../controllers/flat.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = express.Router();
router.get("/getAllFlats", getAllFlats);
router.post("/addFlat", authenticationMiddleware, addFlat);
router.patch("/updateFlat/:id", authenticationMiddleware, updateFlat);
router.get("/getFlatById/:id", getFlatById);
router.delete("/deletedFlat/:id", authenticationMiddleware, deleteFlat);

export default router;
