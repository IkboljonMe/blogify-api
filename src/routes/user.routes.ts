import { Express } from "express";
import {
  createUserHandler,
  updateUserHandler,
} from "../controllers/user.controller";
import parseSchema from "../middlewares/parseSchema";
import { createUserSchema } from "../schemas/user.schema";

function userRoutes(app: Express) {
  app.post("/api/users", parseSchema(createUserSchema), createUserHandler);
  app.put("/api/users", parseSchema(createUserSchema), updateUserHandler);
}

export default userRoutes;
