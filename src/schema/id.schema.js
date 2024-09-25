import { z } from "zod";

const idSchema = z.object({
  id: z.number().int().positive("ID must be a positive number"),
});

export { idSchema };
