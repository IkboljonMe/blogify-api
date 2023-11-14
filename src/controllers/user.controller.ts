import { Request, Response } from "express";
import { createUser } from "../services/user.service";
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
