import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { jwtSign, verifyJwt } from "../utils/jwt";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from "config";
export async function createSession(userId: string, userAgent: string) {
  try {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function getSessions(query: FilterQuery<SessionDocument>) {
  return await SessionModel.find(query).lean();
}
export default function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.findOneAndUpdate(query, update);
}
export async function setNewAccesToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);
  if (!decoded || !get(decoded, "_id")) return false;
  const session = await SessionModel.findById(get(decoded, "session"));
  if (!session || !session.valid) return false;
  const user = await findUser({ _id: session.user });
  if (!user) return false;
  const newAccessToken = jwtSign(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get<string>("accessTokenTime") }
  );
  return newAccessToken;
}
