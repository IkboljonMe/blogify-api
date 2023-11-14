import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 10);
export interface BlogDocument extends mongoose.Document {
  user: UserDocument["_id"];
  title: string;
  description: string;
  likes: number;
  read: number;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new mongoose.Schema(
  {
    blogId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(),
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    likes: { type: Number, default: 0 },
    read: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);
const BlogModel = mongoose.model<BlogDocument>("Blog", blogSchema);
export default BlogModel;
