import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: This route is used to create a new user account.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Invalid input or missing data
 */
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Inicia de sesión de un usuario
 *     description: This route allows a user to log in by providing email and password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User logged in successfully, returns a token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       401:
 *         description: Invalid email or password
 */
router.post("/register", register);
router.post("/login", login);

export default router;
