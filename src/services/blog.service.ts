import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import BlogModel, { BlogDocument } from "../models/blog.model";
import { UserDocument } from "../models/user.model";

export async function createBlog(
  input: Partial<
    Omit<BlogDocument, "createdAt" | "updatedAt" | "read" | "likes">
  >
) {
  try {
    const blog = await BlogModel.create(input);
    return blog;
  } catch (error) {
    console.log(error, "Error while creating a blog");
  }
}
export async function getBlog(
  query: FilterQuery<BlogDocument>,
  options: QueryOptions = { lean: true }
) {
  return await BlogModel.findOne(query, {}, options);
}
export async function getAllBlogs(query: FilterQuery<UserDocument>) {
  return await BlogModel.find(query).lean();
}
export async function deleteBlog(query: FilterQuery<BlogDocument>) {
  return await BlogModel.deleteOne(query);
}
export async function updateBlog(
  query: FilterQuery<BlogDocument>,
  update: UpdateQuery<BlogDocument>,
  options: QueryOptions
) {
  return await BlogModel.findOneAndUpdate(query, update, options);
}
export async function likeBlog(
  blogId: string,
  userId: string
): Promise<BlogDocument | null> {
  try {
    const updatedBlog = await BlogModel.findOneAndUpdate(
      { blogId, likes: { $ne: userId } },
      { $push: { likes: userId } },
      { new: true }
    );

    return updatedBlog; // Return null if the blog is not found
  } catch (error) {
    console.error("Error liking blog:", error);
    throw error;
  }
}
export async function unlikeBlog(blogId: string, userId: string) {
  try {
    const unlikedBlog = await BlogModel.findOneAndUpdate(
      { blogId, likes: userId },
      { $pull: { likes: userId } },
      { new: true }
    );
    return unlikedBlog;
  } catch (error: any) {
    console.log("Error while unliking blog", error);
  }
}
