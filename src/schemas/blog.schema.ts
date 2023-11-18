import { TypeOf, z } from "zod";

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    description: z
      .string({
        required_error: "Description is required",
      })
      .min(120, "Description should be 120 chars long at least"),
  }),
});

export const blogParamsSchema = z.object({
  params: z.object({
    blogId: z.string({
      required_error: "blogId is in params required",
    }),
  }),
});

export type BlogParamsInput = TypeOf<typeof blogParamsSchema>;
export type CreatBlogInput = TypeOf<typeof createBlogSchema>;
