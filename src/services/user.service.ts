import { omit } from "lodash";
import UserModel, { UserDocument } from "../models/user.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

export async function createUser(
  input: Partial<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });
  if (!user) return false;
  const isValid = user.comparePassword(password);
  if (!isValid) return false;
  return omit(user.toJSON(), "password");
}
export async function findUser(query: FilterQuery<UserDocument>) {
  return await UserModel.findOne(query).lean();
}
export async function updateUser(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>
) {
  return await UserModel.findOneAndUpdate(query, update);
}
