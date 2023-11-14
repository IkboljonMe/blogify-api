import { Express, Request, Response } from "express";
import { createUserHandler } from "./controllers/user.controller";
import { createSessionHandler } from "./controllers/session.controller";
function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.post("/api/users", createUserHandler);
  app.post("/api/sessions", createSessionHandler);
}
export default routes;
