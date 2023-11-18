import { z } from "zod";
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateSessionInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           default: test@gmail.com
 *         password:
 *           type: string
 *           default: stringPassword
 */
const createSessionSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password too short - should be 6 chars minimum"),
    email: z
      .string({
        required_error: "Email",
      })
      .email("Not a valid email"),
  }),
});
export default createSessionSchema;
