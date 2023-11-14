import { Express, Request, Response } from "express";
import { createUserHandler } from "./controllers/user.controller";
import {
  createSessionHandler,
  deleteUserSessionHanler,
  getUserSessionsHandler,
} from "./controllers/session.controller";
import requireUser from "./middlewares/requireUser";
import parseSchema from "./middlewares/parseSchema";
import { createUserSchema } from "./schemas/user.schema";
import createSessionSchema from "./schemas/session.schema";
import { createBlogHandler } from "./controllers/blog.controller";
import { createBlogSchema } from "./schemas/blog.schema";
function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.post("/api/users", parseSchema(createUserSchema), createUserHandler);
  app.post(
    "/api/sessions",
    parseSchema(createSessionSchema),
    createSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteUserSessionHanler);
  app.post(
    "/api/blogs",
    [requireUser, parseSchema(createBlogSchema)],
    createBlogHandler
  );
}
export default routes;
