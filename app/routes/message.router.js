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
import authorizationMiddleware from "../middlewares/authorization.middleware.js";

const router = express.Router();
router.get("/flats/:id", getAllMessages);
router.get("/flats/:id:senderId", getUserMessages);
router.post("/flats/:id/messages", authorizationMiddleware, addMessage);

export default router;
