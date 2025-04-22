import { z } from "zod";

export const idValidation = z.object({
    id: z
      .string()
      .length(25, "ID inválido")
      .refine((val) => /^c[^\s-]{24}$/.test(val), {
        message: "ID deve ser um CUID válido.",
      }),
  });
  