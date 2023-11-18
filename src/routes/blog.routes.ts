import { Express } from "express";
import {
  createBlogHandler,
  deleteBlogHandler,
  getAllBlogsHandler,
  getBlogHandler,
  likeBlogHandler,
  readBlogHandler,
  unlikeBlogHandler,
  updateBlogHandler,
} from "../controllers/blog.controller";
import parseSchema from "../middlewares/parseSchema";
import {
  blogParamsSchema,
  createBlogSchema,
  updateBlogSchema,
} from "../schemas/blog.schema";
import checkUserAndBlog from "../middlewares/checkUserAndBlog";
import requireUser from "../middlewares/requireUser";

function blogRoutes(app: Express) {
  app.post(
    "/api/blogs",
    [requireUser, parseSchema(createBlogSchema)],
    createBlogHandler
  );
  app.get(
    "/api/blogs/:blogId",
    [requireUser, parseSchema(blogParamsSchema)],
    getBlogHandler
  );
  app.get("/api/blogs", getAllBlogsHandler);
  app.delete(
    "/api/blogs/:blogId",
    [requireUser, checkUserAndBlog, parseSchema(blogParamsSchema)],
    deleteBlogHandler
  );
  app.put(
    "/api/blogs/:blogId",
    [requireUser, checkUserAndBlog, parseSchema(updateBlogSchema)],
    updateBlogHandler
  );
  app.post(
    "/api/blogs/:blogId/like",
    [requireUser, parseSchema(blogParamsSchema)],
    likeBlogHandler
  );
  app.post(
    "/api/blogs/:blogId/unlike",
    [requireUser, parseSchema(blogParamsSchema)],
    unlikeBlogHandler
  );
  app.post(
    "/api/blogs/:blogId/read",
    [requireUser, parseSchema(blogParamsSchema)],
    readBlogHandler
  );
}

export default blogRoutes;
