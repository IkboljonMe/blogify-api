import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { jwtSign, verifyJwt } from "../utils/jwt";
import { get } from "lodash";
import { findUser } from "./user.service";
import { startDatabaseTimer } from "../utils/metrics";

export async function createSession(userId: string, userAgent: string) {
  const { timerSuccess, timerFailure } = startDatabaseTimer("createSession");
  try {
    const session = await SessionModel.create({ user: userId, userAgent });
    timerSuccess();
    return session.toJSON();
  } catch (error: any) {
    console.log("Error", error);
    timerFailure();
  }
}
export async function getSessions(query: FilterQuery<SessionDocument>) {
  const { timerSuccess, timerFailure } = startDatabaseTimer("getSessions");
  try {
    const sessions = await SessionModel.find(query).lean();
    timerSuccess();
    return sessions;
  } catch (error: any) {
    console.log("Error", error);
    timerFailure();
  }
}
export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  const { timerSuccess, timerFailure } = startDatabaseTimer("updateSession");
  try {
    const updatedSession = await SessionModel.findOneAndUpdate(query, update);
    timerSuccess();
    return updatedSession;
  } catch (error: any) {
    console.log("Error", error);
    timerFailure();
  }
}
//additional
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
    { expiresIn: process.env.NODE_ENV_ACCESS_TOKEN ?? "" }
  );
  return newAccessToken;
}
