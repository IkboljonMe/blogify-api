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
  app.post(
    "/api/sessions",
    parseSchema(createSessionSchema),
    createSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteUserSessionHanler);
}

export default sessionRoutes;
