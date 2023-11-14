import { Request, Response } from "express";
import { createBlog } from "../services/blog.service";
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
