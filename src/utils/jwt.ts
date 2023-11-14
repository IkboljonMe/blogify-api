import jwt from "jsonwebtoken";
import config from "config";

const secret = config.get<string>("jwtSecret");
export function jwtSign(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, secret, {
    ...(options && options),
  });
}
export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, secret);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}
