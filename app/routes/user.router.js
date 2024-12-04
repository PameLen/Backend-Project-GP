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
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstname
 *         - lastname
 *         - birthdate
 *         - isAdmin
 *       properties:
 *         email:
 *           type: string
 *           description: Email del usuario.
 *         password:
 *           type: string
 *           description: Password del usuario.
 *         firstname:
 *           type: string
 *           description: Primer nombre del usuario.
 *         lastname:
 *           type: string
 *           description: Apellido del usuario.
 *         birthdate:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento de usuario.
 *         isAdmin:
 *           type: boolean
 *           description: La cuenta del usuario es administrador?
 *         created:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del usuario.
 *         updated:
 *           type: string
 *           format: date-time
 *           description: Fecha de actualización de los datos del usuario.
 *       example:
 *         email: "aromero@flatfinder.com"
 *         password: "admin1245"
 *         firstname: "Andres"
 *         lastname: "Romero"
 *         birthdate: "1994-01-01T00:00:00.000Z"
 *         isAdmin: true
 */
/**
 * @swagger
 * /users/getAllUsers:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Get a list of all registered users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The user list was successfully recovered
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
/**
 * @swagger
 * /users/getUserById/{id}:
 *   get:
 *     summary: Obtener un usuario por su ID
 *     description: Get details of a specific user based on their ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to recover.
 *     responses:
 *       200:
 *         description: The user was successfully recovered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */
/**
 * @swagger
 * /users/updateUser/{id}:
 *   patch:
 *     summary: Actualizar los datos de un usuario por su ID
 *     description: Updates specific information about a user by their ID.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully updated the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input or missing data.
 *       404:
 *         description: User not found.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 */
/**
 * @swagger
 * /users/deleteUser/{id}:
 *   delete:
 *     summary: Eliminar un usuario por su ID
 *     description: Delete a user from the database based on their ID.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete.
 *     responses:
 *       200:
 *         description: User successfully deleted.
 *       404:
 *         description: User not found.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 */

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
