import { Request, Response } from "express";
import {
  createBlog,
  getAllBlogs,
  getBlog,
  likeBlog,
  updateBlog,
} from "../services/blog.service";
import { CreatBlogInput } from "../schemas/blog.schema";
import { deleteBlog } from "../services/blog.service";

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
export async function deleteBlogHandler(req: Request, res: Response) {
  const { blogId } = req.params;
  const deletedBlog = await deleteBlog({ blogId });
  return res.send(deletedBlog);
}
export async function updateBlogHandler(req: Request, res: Response) {
  const { blogId } = req.params;
  const update = req.body;
  const updatedBlog = await updateBlog({ blogId }, update, { new: true });
  console.log(update, updatedBlog, req);
  return res.send(updatedBlog);
}
export async function likeBlogHandler(req: Request, res: Response) {
  //if user is like or not
  const userId = res.locals.user._id;
  const blogId = req.params.blogId;
  const likedBlog = await likeBlog(blogId, userId);
  if (!likedBlog) {
    res.status(404);
  }
  return res.send(likedBlog);
}
