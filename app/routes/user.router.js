/*
función ruta método http permisos
getAllUsers /users GET admin
getUserById /users/:id GET
updateUser /users/:id PATCH admin/account owner (dueño de la cuenta)
deleteUser /users/:id DELETE admin/accountowner

*/

import express from "express";
import {
  saveUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", saveUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
