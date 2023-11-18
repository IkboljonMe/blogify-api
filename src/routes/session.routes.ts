import { Express } from "express";
import {
  createSessionHandler,
  deleteUserSessionHanler,
  getUserSessionsHandler,
} from "../controllers/session.controller";
import parseSchema from "../middlewares/parseSchema";
import createSessionSchema from "../schemas/session.schema";
import requireUser from "../middlewares/requireUser";
function sessionRoutes(app: Express) {
  /**
   * @openapi
   * /api/sessions:
   *   post:
   *     tags:
   *       - Create a session
   *     summary: Create a session
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateSessionInput'
   *     responses:
   *       '200':
   *         description: Session created successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CreateSessionResponse'
   *       '401':
   *         description: Invalid email or password
   *       '400':
   *         description: Bad request, invalid input
   */
  app.post(
    "/api/sessions",
    parseSchema(createSessionSchema),
    createSessionHandler
  );
  /**
   * @openapi
   * /api/sessions:
   *   get:
   *     tags:
   *       - Get user all sessions
   *     summary: Get user all sessions
   *     responses:
   *       '200':
   *         description: Sessions retrieved succesfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/GetUserAllSessionsResponse'
   *       '404':
   *         description: Schemas not found
   *       '403':
   *         description: User is unauthorized
   */
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  /**
   * @openapi
   * /api/sessions:
   *   delete:
   *     tags:
   *       - Delete current user's session
   *     summary: Delete a session
   *     responses:
   *       '200':
   *         description: Session is deleted succesfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/DeleteSessionResponse'
   *       '404':
   *         description: Schemas not found
   *       '403':
   *         description: User is unauthorized
   */
  app.delete("/api/sessions", requireUser, deleteUserSessionHanler);
}

export default sessionRoutes;
