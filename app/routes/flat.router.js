import express from "express";
import {
  getAllFlats,
  addFlat,
  getFlatById,
  updateFlat,
  deleteFlat,
} from "../controllers/flat.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
/**
 * @swagger
 * components:
 *   schemas:
 *     Flat:
 *       type: object
 *       required:
 *         - city
 *         - streetName
 *         - streetNumber
 *         - areaSize
 *         - yearBuilt
 *         - ownerId
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del flat
 *         city:
 *           type: string
 *           description: Ciudad donde se ubica el flat
 *         streetName:
 *           type: string
 *           description: Nombre de la calle
 *         streetNumber:
 *           type: string
 *           description: Número de la calle
 *         areaSize:
 *           type: number
 *           description: Tamaño del flat en metros cuadrados
 *         yearBuilt:
 *           type: number
 *           description: Año en que se construyó el flat
 *         ownerId:
 *           type: string
 *           description: ID del usuario propietario
 *         created:
 *           type: string
 *           format: date
 *           description: Fecha de creación del flat
 *       example:
 *         city: "Quito"
 *         streetName: "Av. 6 de Diciembre"
 *         streetNumber: "42"
 *         areaSize: 90
 *         hasAc: false
 *         yearBuilt: 2022
 *         rentPrice: 800
 *         dateAvailable: "2024-05-05T00:00:00.000Z"
 */
/**
 * @swagger
 * /flats/addFlat:
 *   post:
 *     summary: Crear un nuevo flat
 *     tags: [Flats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flat'
 *     responses:
 *       201:
 *         description: Flat created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flat'
 *       400:
 *         description: Invalid input or missing data.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 */
/**
 * @swagger
 * /flats/getAllFlats:
 *   get:
 *     summary: Obtener todos los flats
 *     tags: [Flats]
 *     responses:
 *       200:
 *         description: Flats list successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flat'
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 *       404:
 *         description: User not found.
 */
/**
 * @swagger
 * /flats/getFlatById/{id}:
 *   get:
 *     summary: Obtener un flat por su ID
 *     tags: [Flats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the flat to recover
 *     responses:
 *       200:
 *         description: Flat recovered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flat'
 *       404:
 *         description: Flat not found
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 */
/**
 * @swagger
 * /flats/updateFlat/{id}:
 *   patch:
 *     summary: Actualizar un flat por su ID
 *     tags: [Flats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the flat to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flat'
 *     responses:
 *       200:
 *         description: Flat updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flat'
 *       400:
 *         description: Request error
 *       404:
 *         description: Flat not found
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 */
/**
 * @swagger
 * /flats/deletedFlat/{id}:
 *   delete:
 *     summary: Eliminar un flat por su ID
 *     tags: [Flats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the flat to delete
 *     responses:
 *       200:
 *         description: Flat removed successfully
 *       404:
 *         description: Flat not found
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 */

const router = express.Router();
router.get("/getAllFlats", getAllFlats);
router.post("/addFlat", authenticationMiddleware, addFlat);
router.patch("/updateFlat/:id", authenticationMiddleware, updateFlat);
router.get("/getFlatById/:id", getFlatById);
router.delete("/deletedFlat/:id", authenticationMiddleware, deleteFlat);

export default router;
