import { TypeOf, z } from "zod";
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        email:
 *          type: string
 *          default: test@gmail.com
 *        name:
 *          type: string
 *          default: Test Tester
 *        password:
 *          type: string
 *          default: stringPassword
 *        passwordConfirmation:
 *          type: string
 *          default: stringPassword
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    UpdateUserInput:
 *      type: object
 *      required:
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        email:
 *          type: string
 *          default: test@gmail.com
 *        name:
 *          type: string
 *          default: Updated Update
 *        password:
 *          type: string
 *          default: stringPassword
 *        passwordConfirmation:
 *          type: string
 *          default: stringPassword
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    UserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 */
export const createUserSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "Name is required" }),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(6, "Password too short - should be 6 chars minimum"),
      passwordConfirmation: z.string({
        required_error: "passwordConfirmation is required",
      }),
      email: z
        .string({
          required_error: "Email",
        })
        .email("Not a valid email"),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    }),
});
export const updateUserSchema = z.object({
  body: z
    .object({
      name: z.string(),
      email: z.string().email("Not a valid email"),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(6, "Password too short - should be 6 chars minimum"),
      passwordConfirmation: z.string({
        required_error: "passwordConfirmation is required",
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    }),
});
export type UpdateUserInput = Omit<
  TypeOf<typeof updateUserSchema>,
  "body.passwordConfirmation"
>;
export type CreatUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
