import { Request, Response } from "express";
import { validatePassword } from "../services/user.service";
import { createSession, getSessions } from "../services/session.service";
import { jwtSign } from "../utils/jwt";
import config from "config";

export async function createSessionHandler(req: Request, res: Response) {
  //validate user password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  //create session
  const session = await createSession(user._id, res.get("user-agent") || "");
  //create acces and refresh tokens and send send them back
  const accessToken = jwtSign(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get<string>("accessTokenTime") }
  );
  const refreshToken = jwtSign(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get<string>("refreshTokenTime") }
  );
  res.send({ accessToken, refreshToken });
}
export async function getUserSessions(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await getSessions({ user: userId, valid: true });
  return res.send(sessions);
}