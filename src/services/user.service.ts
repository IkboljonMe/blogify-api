import { omit } from "lodash";
import UserModel, { UserDocument } from "../models/user.model";

export async function createUser(
  input: Omit<UserDocument, "createdAt" | "updatedAt">
) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
}
