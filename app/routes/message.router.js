/*
función ruta
método
http permisos
getAllMessages /flats/:id/messages GET flat owner
getUserMessages/flats/:id/messages/:senderId GET the sender (el remitente)
addMessage /flats/:id/messages POST
*/
import express from "express";
import {
  getAllMessages,
  getUserMessages,
  addMessage,
} from "../controllers/message.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = express.Router();
//router.get("/flats/:id/messages", getAllMessages);
//router.get("/flats/:id/messages/:senderId", getUserMessages);
//router.post("/flats/:id/messages", addMessage);
router.post("/:id/messages", authenticationMiddleware, addMessage);
router.get(
  "/:id/messages/:senderId",
  authenticationMiddleware,
  getUserMessages
);
router.get("/:id/messages", authenticationMiddleware, getAllMessages);

export default router;
