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

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - content
 *         - flatId
 *         - senderId
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del mensaje
 *         content:
 *           type: string
 *           description: Contenido del mensaje
 *         flatId:
 *           type: string
 *           description: ID del flat relacionado con el mensaje
 *         senderId:
 *           type: string
 *           description: ID del usuario que envió el mensaje
 *         created:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del mensaje
 *       example:
 *         id: "637d1f77a3f48a003b2c28b6"
 *         content: "Estoy interesado en este flat. ¿Podríamos agendar una visita?"
 *         flatId: "637d1f77a3f48a003b2c28b2"
 *         senderId: "637d1f77a3f48a003b2c28b3"
 *         created: "2023-12-01T12:00:00.000Z"
 */
/**
 * @swagger
 * /flats/{id}/messages:
 *   get:
 *     summary: Recuperar todos los mensajes de un flat
 *     description: Fetches all messages related to a specific flat by its ID.
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the flat to retrieve messages for.
 *     responses:
 *       200:
 *         description: Successfully retrieved messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       404:
 *         description: Flat not found or no messages associated.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 *     security:
 *       - bearerAuth: []
 */
/**
 * @swagger
 * /flats/{id}/messages:
 *   post:
 *     summary: Agregar un mensaje a un flat
 *     description: Este endpoint permite a un usuario autenticado agregar un mensaje asociado a un flat específico.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del flat donde se enviará el mensaje.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Contenido del mensaje.
 *             example:
 *               content: "Este es un mensaje de prueba para el flat."
 *     responses:
 *       201:
 *         description: Mensaje agregado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                 data:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                       description: Contenido del mensaje.
 *                     senderId:
 *                       type: string
 *                       description: ID del usuario que envió el mensaje.
 *                     flatId:
 *                       type: string
 *                       description: ID del flat asociado al mensaje.
 *       400:
 *         description: Error en la solicitud (datos faltantes o inválidos).
 *       401:
 *         description: No autorizado. El token es inválido o está ausente.
 *       404:
 *         description: Flat no encontrado.
 */

/**
 * @swagger
 * /flats/{id}/messages/{senderId}:
 *   get:
 *     summary: Retrieve messages for a flat sent by a specific user
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del flat para obtener mensajes.
 *       - in: path
 *         name: senderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario que envió los mensajes.
 *     responses:
 *       200:
 *         description: Lista de mensajes enviados por el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       404:
 *         description: No se encontraron mensajes o el flat no existe.
 *       401:
 *         description: Token inválido o ausente.
 *     security:
 *       - bearerAuth: []
 */

router.post("/:id/messages", authenticationMiddleware, addMessage);
router.get(
  "/:id/messages/:senderId",
  authenticationMiddleware,
  getUserMessages
);
router.get("/:id/messages", authenticationMiddleware, getAllMessages);

export default router;
