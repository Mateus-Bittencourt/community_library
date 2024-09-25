import { z } from "zod";

const loanSchema = z.object({
  bookId: z.number().int().positive("BookId must be a positive number"),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Due date must be in the format YYYY-MM-DD"),
});

export { loanSchema };
