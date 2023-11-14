import BlogModel, { BlogDocument } from "../models/blog.model";

export async function createBlog(
  input: Partial<
    Omit<BlogDocument, "createdAt" | "updatedAt" | "read" | "likes">
  >
) {
  try {
    const blog = BlogModel.create(input);
    return blog;
  } catch (error) {
    console.log(error, "Error while creating a blog");
  }
}
