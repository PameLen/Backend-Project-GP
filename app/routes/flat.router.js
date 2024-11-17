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
} from "../controllers/flat.controller.js";
const router = express.Router();
router.get("/getAllFlats", getAllFlats);
router.post("/addFlats", addFlat);
router.get("/getFlatById/:id", getFlatById);

export default router;
