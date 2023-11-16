import { Express, Request, Response } from "express";
import {
  createUserHandler,
  updateUserHandler,
} from "./controllers/user.controller";
import {
  createSessionHandler,
  deleteUserSessionHanler,
  getUserSessionsHandler,
} from "./controllers/session.controller";
import requireUser from "./middlewares/requireUser";
import parseSchema from "./middlewares/parseSchema";
import { createUserSchema } from "./schemas/user.schema";
import createSessionSchema from "./schemas/session.schema";
import {
  createBlogHandler,
  deleteBlogHandler,
  getAllBlogsHandler,
  getBlogHandler,
  likeBlogHandler,
  readBlogHandler,
  unlikeBlogHandler,
  updateBlogHandler,
} from "./controllers/blog.controller";
import { createBlogSchema } from "./schemas/blog.schema";
import checkUserAndBlog from "./middlewares/checkUserAndBlog";
function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.post("/api/users", parseSchema(createUserSchema), createUserHandler);
  app.put("/api/users", parseSchema(createUserSchema), updateUserHandler);

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
  app.get("/api/blogs/:blogId", requireUser, getBlogHandler);
  app.get("/api/blogs", getAllBlogsHandler);
  app.delete(
    "/api/blogs/:blogId",
    [requireUser, checkUserAndBlog],
    deleteBlogHandler
  );
  app.post("/api/blogs/:blogId/like", requireUser, likeBlogHandler);
  app.post("/api/blogs/:blogId/unlike", requireUser, unlikeBlogHandler);
  app.post("/api/blogs/:blogId/read", requireUser, readBlogHandler);
}
export default routes;
