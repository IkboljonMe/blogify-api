import { Express, Request, Response } from "express";
import { createUserHandler } from "./controllers/user.controller";
function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.post("/api/users", createUserHandler);
}
export default routes;
