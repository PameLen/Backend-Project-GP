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
import { getAllFlats, addFlat } from "../controllers/flat.controller.js";
const router = express.Router();
router.get("/", getAllFlats);
router.post("/", addFlat);

export default router;
