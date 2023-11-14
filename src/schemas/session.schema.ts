import { z } from "zod";

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
