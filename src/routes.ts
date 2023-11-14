import { Express, Request, Response } from "express";
import { createUserHandler } from "./controllers/user.controller";
import {
  createSessionHandler,
  getUserSessionsHandler,
} from "./controllers/session.controller";
import requireUser from "./middlewares/requireUser";
function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.post("/api/users", createUserHandler);
  app.post("/api/sessions", createSessionHandler);
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
}
export default routes;
