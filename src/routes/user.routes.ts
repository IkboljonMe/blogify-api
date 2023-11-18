import { Express } from "express";
import {
  createUserHandler,
  updateUserHandler,
} from "../controllers/user.controller";
import parseSchema from "../middlewares/parseSchema";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import requireUser from "../middlewares/requireUser";
/**
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Register a user
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       '200':
 *         description: User registration successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '409':
 *         description: Conflict, duplicate user
 *       '400':
 *         description: Bad request, invalid input
 */
/**
 * @openapi
 * /api/users:
 *   put:
 *     tags:
 *       - Update a user
 *     summary: Update a user
 *     security:
 *       - bearerAuth: []  # Assuming you use JWT for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '409':
 *         description: Conflict, duplicate user
 *       '403':
 *         description: User is unauthorized
 *       '400':
 *         description: Bad request, invalid input
 */

function userRoutes(app: Express) {
  app.post("/api/users", parseSchema(createUserSchema), createUserHandler);
  app.put(
    "/api/users",
    [requireUser, parseSchema(updateUserSchema)],
    updateUserHandler
  );
}

export default userRoutes;
