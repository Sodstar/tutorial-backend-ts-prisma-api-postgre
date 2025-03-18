import { z } from "zod";

export const bookIdSchema = z.object({
  id: z.string().regex(/^\d+$/, "Book ID must be a number"),
});