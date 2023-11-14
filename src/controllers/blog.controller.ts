import { Request, Response } from "express";
import { createBlog } from "../services/blog.service";

export async function createBlogHandler(req: Request, res: Response) {
  try {
    const userId = res.locals.user._id;
    const body = req.body;
    const blog = await createBlog({ ...body, user: userId });
    return res.send(blog);
  } catch (error) {
    console.log(error, "Error while create a blog on handler fn");
  }
}
