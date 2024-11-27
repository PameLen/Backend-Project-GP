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
import authorizationMiddleware from "../middlewares/authorization.middleware.js";

const router = express.Router();
router.get("/getAllFlats", getAllFlats);
router.post("/addFlat", addFlat);
router.patch(
  "/updateFlat/:id",
  authenticationMiddleware,
  authorizationMiddleware(["admin"]),
  updateFlat
);
router.get("/getFlatById/:id", getFlatById);
router.delete("/deletedFlat/:id", deleteFlat);

export default router;
