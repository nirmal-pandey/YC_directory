import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z
    .string()
    .url()
    .refine((url) => /\.(jpeg|jpg|gif|png|webp|svg)$/.test(url), {
      message: "URL must end with a valid image extension",
    }),
  pitch: z.string().min(10),
});