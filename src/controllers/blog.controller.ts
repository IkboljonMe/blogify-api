import { Request, Response } from "express";
import { createBlog, getAllBlogs, getBlog } from "../services/blog.service";
import { CreatBlogInput } from "../schemas/blog.schema";

export async function createBlogHandler(
  req: Request<{}, {}, CreatBlogInput["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const body = req.body;
    const blog = await createBlog({ ...body, user: userId });
    return res.send(blog);
  } catch (error) {
    console.log(error, "Error while create a blog on handler fn");
  }
}
export async function getBlogHandler(req: Request, res: Response) {
  const blogId = req.params.blogId;
  const blog = await getBlog({ blogId });
  if (!blog) {
    return res.status(404);
  }
  return res.send(blog);
}
export async function getAllBlogsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const blogs = await getAllBlogs({ user: userId });
  if (!blogs) return [];
  return res.send(blogs);
}
