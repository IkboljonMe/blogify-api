import { Express, Request, Response } from "express";
import userRoutes from "./user.routes";
import sessionRoutes from "./session.routes";
import blogRoutes from "./blog.routes";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  userRoutes(app);
  sessionRoutes(app);
  blogRoutes(app);
}

export default routes;
