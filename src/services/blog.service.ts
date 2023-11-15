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
