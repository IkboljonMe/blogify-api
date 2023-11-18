import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import BlogModel, { BlogDocument } from "../models/blog.model";
import { UserDocument } from "../models/user.model";
import { startDatabaseTimer } from "../utils/metrics";

export async function createBlog(
  input: Partial<
    Omit<BlogDocument, "createdAt" | "updatedAt" | "read" | "likes">
  >
) {
  const { timerSuccess, timerFailure } = startDatabaseTimer("createBlog");
  try {
    const blog = await BlogModel.create(input);
    timerSuccess();
    return blog;
  } catch (error: any) {
    console.log("Error", error);
    timerFailure();
  }
}
export async function getBlog(
  query: FilterQuery<BlogDocument>,
  options: QueryOptions = { lean: true }
) {
  const { timerSuccess, timerFailure } = startDatabaseTimer("getBlog");
  try {
    const blog = BlogModel.findOne(query, {}, options);
    timerSuccess();
    return await blog;
  } catch (error: any) {
    console.log("Error", error);
    timerFailure();
  }
}
export async function getAllBlogs(query: FilterQuery<UserDocument>) {
  const { timerSuccess, timerFailure } = startDatabaseTimer("getAllBlogs");
  try {
    const blogs = await BlogModel.find(query).lean();
    timerSuccess();
    return blogs;
  } catch (error: any) {
    console.log("Error", error);
    timerFailure();
  }
}
export async function deleteBlog(query: FilterQuery<BlogDocument>) {
  const { timerSuccess, timerFailure } = startDatabaseTimer("deleteBlog");
  try {
    const deletedBlog = await BlogModel.deleteOne(query);
    timerSuccess();
    return deletedBlog;
  } catch (error: any) {
    console.log("Error", error);
    timerFailure();
  }
}
export async function updateBlog(
  query: FilterQuery<BlogDocument>,
  update: UpdateQuery<BlogDocument>,
  options: QueryOptions
) {
  const { timerSuccess, timerFailure } = startDatabaseTimer("updateBlog");
  try {
    const updatedBlog = await BlogModel.findOneAndUpdate(
      query,
      update,
      options
    );
    timerSuccess();
    return updatedBlog;
  } catch (error: any) {
    console.log("Error", error);
    timerFailure();
  }
}
export async function likeBlog(blogId: string, userId: string) {
  const { timerSuccess, timerFailure } = startDatabaseTimer("likeBlog");
  try {
    const likedBlog = await BlogModel.findOneAndUpdate(
      { blogId, likes: { $ne: userId } },
      { $push: { likes: userId } },
      { new: true }
    );
    timerSuccess();
    return likedBlog;
  } catch (error: any) {
    console.log("Error", error);
    timerFailure();
  }
}
export async function unlikeBlog(blogId: string, userId: string) {
  const { timerSuccess, timerFailure } = startDatabaseTimer("unlikeBlog");
  try {
    const unlikedBlog = await BlogModel.findOneAndUpdate(
      { blogId, likes: userId },
      { $pull: { likes: userId } },
      { new: true }
    );
    timerSuccess();
    return unlikedBlog;
  } catch (error: any) {
    console.log("Error", error);
    timerFailure();
  }
}
export async function readBlog(userId: string, blogId: string) {
  const { timerSuccess, timerFailure } = startDatabaseTimer("readBlog");
  try {
    const hasReadBlog = BlogModel.findOneAndUpdate(
      { blogId, read: { $ne: userId } },
      { $push: { read: userId } },
      { new: true }
    );
    timerSuccess();
    return hasReadBlog;
  } catch (error: any) {
    console.log("Error", error);
    timerFailure();
  }
}
