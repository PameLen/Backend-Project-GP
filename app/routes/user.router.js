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
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import validateUserOrAdmin from "../middlewares/accountownerMiddleware.js";

const router = express.Router();

router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.patch(
  "/updateUser/:id",
  authenticationMiddleware,
  validateUserOrAdmin,
  updateUser
);
router.delete(
  "/deleteUser/:id",
  authenticationMiddleware,
  validateUserOrAdmin,
  deleteUser
);

export default router;
