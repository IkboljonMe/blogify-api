import { NextFunction, Request, Response } from "express";
import { getBlog } from "../services/blog.service";
export default async function checkUserAndBlog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const blogId = req.params.blogId;
  const userId = res.locals.user._id;
  const blog = await getBlog({ blogId });
  if (!blog) {
    return res.sendStatus(404);
  }
  if (String(blog.user) !== userId) {
    return res.sendStatus(403);
  }
  return next();
}
