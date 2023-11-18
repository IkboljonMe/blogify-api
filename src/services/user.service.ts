import { omit } from "lodash";
import UserModel, { UserDocument } from "../models/user.model";
import { FilterQuery, UpdateQuery } from "mongoose";
import { startDatabaseTimer } from "../utils/metrics";

export async function createUser(
  input: Partial<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  const { timerSuccess, timerFailure } = startDatabaseTimer("createUser");
  try {
    const user = await UserModel.create(input);
    timerSuccess();
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    console.log("Error", error);
    timerFailure();
  }
}
export async function findUser(query: FilterQuery<UserDocument>) {
  const { timerSuccess, timerFailure } = startDatabaseTimer("findUser");
  try {
    const user = await UserModel.findOne(query).lean();
    timerSuccess();
    return user;
  } catch (error: any) {
    console.log("Error", error);
    timerFailure();
  }
}
export async function updateUser(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>
) {
  const { timerSuccess, timerFailure } = startDatabaseTimer("updateUser");
  try {
    const updatedUser = await UserModel.findOneAndUpdate(query, update);
    timerSuccess();
    return updatedUser;
  } catch (error: any) {
    console.log("Error", error);
    timerFailure();
  }
}
//additional
export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return false;
    const isValid = user.comparePassword(password);
    if (!isValid) return false;
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    console.log("Error", error);
  }
}
