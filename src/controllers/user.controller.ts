import { Request, Response } from "express";
import { createUser } from "../services/user.service";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = createUser(req.body);
    return res.send(user);
  } catch (error: any) {
    return res.sendStatus(409).send(error.message);
  }
}
