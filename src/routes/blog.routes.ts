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
  /**
   * @openapi
   * /api/blogs:
   *   post:
   *     tags:
   *       - Create a blog
   *     summary: Create a new blog
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateBlogInput'
   *     responses:
   *       '200':
   *         description: Blog creation successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BlogResponseInput'
   *       '409':
   *         description: Conflict, duplicate blog
   *       '400':
   *         description: Bad request, invalid input
   *       '403':
   *         description: Unauthorized, user not logged in
   */
  app.post(
    "/api/blogs",
    [requireUser, parseSchema(createBlogSchema)],
    createBlogHandler
  );
  /**
   * @openapi
   * /api/blogs/{blogId}:
   *   get:
   *     tags:
   *       - Get a blog
   *     summary: Get a specific blog
   *     parameters:
   *       - name: blogId
   *         in: path
   *         required: true
   *         description: The ID of the blog
   *         schema:
   *           type: string
   *           default: "defaultBlogId"
   *     responses:
   *       '200':
   *         description: Blog retrieval successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BlogResponseInput'
   *       '404':
   *         description: Blog not found
   *       '400':
   *         description: Bad request, invalid input
   *       '403':
   *         description: Unauthorized, user not logged in
   */
  app.get("/api/blogs/:blogId", parseSchema(blogParamsSchema), getBlogHandler);
  /**
   * @openapi
   * /api/blogs:
   *   get:
   *     tags:
   *       - Get all blogs
   *     summary: Get all blogs
   *     responses:
   *       '200':
   *         description: All blogs are retrieved succesfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/GetAllBlogsResponse'
   *       '400':
   *         description: Bad request
   */
  app.get("/api/blogs", getAllBlogsHandler);
  /**
   * @openapi
   * /api/blogs/{blogId}:
   *   delete:
   *     tags:
   *       - Delete a blog
   *     summary: Delete a specific blog
   *     parameters:
   *       - name: blogId
   *         in: path
   *         required: true
   *         description: The ID of the blog
   *         schema:
   *           type: string
   *           default: "defaultBlogId"
   *     responses:
   *       '200':
   *         description: Blog deleted successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/DeleteBlogResponse'
   *       '404':
   *         description: Blog not found
   *       '400':
   *         description: Bad request, invalid input
   *       '403':
   *         description: Unauthorized, user not logged in
   */
  app.delete(
    "/api/blogs/:blogId",
    [requireUser, checkUserAndBlog, parseSchema(blogParamsSchema)],
    deleteBlogHandler
  );
  /**
   * @openapi
   * /api/blogs/{blogId}:
   *   put:
   *     tags:
   *       - Update a blog
   *     summary: Update a specific blog
   *     parameters:
   *       - name: blogId
   *         in: path
   *         required: true
   *         description: The ID of the blog
   *         schema:
   *           type: string
   *           default: "defaultBlogId"
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateBlogInput'
   *     responses:
   *       '200':
   *         description: Blog updated successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BlogResponseInput'
   *       '404':
   *         description: Blog not found
   *       '400':
   *         description: Bad request, invalid input
   *       '403':
   *         description: Unauthorized, user not logged in
   */
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
