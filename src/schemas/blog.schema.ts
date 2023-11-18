import { TypeOf, z } from "zod";
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateBlogInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           default: Title of blog
 *         description:
 *           type: string
 *           default: Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go
 *     UpdateBlogInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           default: Updated title of blog
 *         description:
 *           type: string
 *           default: Updated description Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go
 */

/**
 * @openapi
 * components:
 *   schemas:
/**
 * @openapi
 * components:
 *   schemas:
 *     BlogResponseInput:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "655902fb66c6642ea7401db5"
 *         user:
 *           type: string
 *           example: "6553d13a12da0a729a88988d"
 *         title:
 *           type: string
 *           example: "Today created 19"
 *         description:
 *           type: string
 *           example: >
 *             Designed for first-time DSLR owners who want impressive results straight out of the box,
 *             capture those magic moments no matter your level with the EOS 1500D.
 *             With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration,
 *             and built-in feature guide, EOS 1500D is always ready to go.
 *         likes:
 *           type: array
 *           items: {}
 *           example: []
 *         read:
 *           type: array
 *           items: {}
 *           example: []
 *         blogId:
 *           type: string
 *           example: "28baf976a3"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-11-18T18:31:23.278Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-11-18T18:31:56.622Z"
 *         __v:
 *           type: integer
 *           example: 0
 *     GetAllBlogsResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/BlogResponse'
 *     DeleteBlogResponse:
 *       type: object
 *       properties:
 *          acknowledged:
 *            type: boolean
 *          deletedCount:
 *            type: number
 */

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
export const updateBlogSchema = z.object({
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
  params: z.object({
    blogId: z.string({
      required_error: "blogId is in params required",
    }),
  }),
});
export type UpdateBlogInput = TypeOf<typeof updateBlogSchema>;
export type BlogParamsInput = TypeOf<typeof blogParamsSchema>;
export type CreatBlogInput = TypeOf<typeof createBlogSchema>;
