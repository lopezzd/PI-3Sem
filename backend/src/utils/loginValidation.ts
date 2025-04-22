import { z } from "zod";

export const loginValidation = z.object({
    email: z.string().email("Email inválido.").min(5, "Email muito curto!"),

    password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres!")
      .max(100, "Senha muito longa!"),
  
});
