import { Express, Request, Response } from "express";
import userRoutes from "./user.routes";
import sessionRoutes from "./session.routes";
import blogRoutes from "./blog.routes";

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *   get:
   *     tags:
   *       - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       '200':
   *         description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  userRoutes(app);
  sessionRoutes(app);
  blogRoutes(app);
}

export default routes;
