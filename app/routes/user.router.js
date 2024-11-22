/*
función ruta método http permisos
getAllUsers /users GET admin
getUserById /users/:id GET
updateUser /users/:id PATCH admin/account owner (dueño de la cuenta)
deleteUser /users/:id DELETE admin/accountowner

*/

import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
//import { register } from "../controllers/auth.controller.js";

const router = express.Router();

//router.post("/register", register);
//router.post("/login", login);

router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.patch("/updateUser/", updateUser);
router.delete("/deleteUse/:id", deleteUser);

export default router;
