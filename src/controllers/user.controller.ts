import { Request, Response } from "express";
import { createUser, updateUser } from "../services/user.service";
import { CreatUserInput } from "../schemas/user.schema";

export async function createUserHandler(
  req: Request<{}, {}, CreatUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (error: any) {
    return res.sendStatus(409).send(error.message);
  }
}
export async function updateUserHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const updated = req.body;
  const updatedUser = await updateUser({ _id: userId }, updated);
  return res.send(updatedUser);
}
