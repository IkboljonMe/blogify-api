import jwt from "jsonwebtoken";
const secret = process.env.NODE_ENV_JWT_SECRET ?? "";
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
