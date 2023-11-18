import { Request, Response } from "express";
import {
  createBlog,
  getAllBlogs,
  getBlog,
  likeBlog,
  readBlog,
  unlikeBlog,
  updateBlog,
} from "../services/blog.service";
import {
  CreatBlogInput,
  BlogParamsInput,
  UpdateBlogInput,
} from "../schemas/blog.schema";
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
export async function getBlogHandler(
  req: Request<BlogParamsInput["params"]>,
  res: Response
) {
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
export async function deleteBlogHandler(
  req: Request<BlogParamsInput["params"]>,
  res: Response
) {
  const { blogId } = req.params;
  const deletedBlog = await deleteBlog({ blogId });
  return res.send(deletedBlog);
}
export async function updateBlogHandler(
  req: Request<UpdateBlogInput["params"]>,
  res: Response
) {
  const { blogId } = req.params;
  const update: UpdateBlogInput["body"] = req.body;
  console.log(blogId, update);
  const updatedBlog = await updateBlog({ blogId }, update, { new: true });
  return res.send(updatedBlog);
}
export async function likeBlogHandler(
  req: Request<BlogParamsInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const blogId = req.params.blogId;
  const likedBlog = await likeBlog(blogId, userId);
  if (!likedBlog) {
    return res.sendStatus(404);
  }
  return res.send(likedBlog);
}
export async function unlikeBlogHandler(
  req: Request<BlogParamsInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const blogId = req.params.blogId;
  const unlikedBlog = await unlikeBlog(blogId, userId);
  if (!unlikedBlog) {
    return res.sendStatus(404);
  }
  return res.send(unlikedBlog);
}
export async function readBlogHandler(
  req: Request<BlogParamsInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const blogId = req.params.blogId;
  const hasReadBlog = await readBlog(userId, blogId);
  if (!hasReadBlog) {
    return res.sendStatus(404);
  }
  return res.send(hasReadBlog);
}
