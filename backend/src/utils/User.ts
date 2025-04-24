import { z } from "zod";

enum Position {
  GERENTE = "GERENTE",
  DESENVOLVEDOR = "DESENVOLVEDOR",
  ANALISTA = "ANALISTA",
  TESTADOR = "TESTADOR",
  MARKETING = "MARKETING",
  ESTAGIARIO = "ESTAGIARIO",
  COORDENADOR = "COORDENADOR",
}

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export const UserValidation = z.object({
  email: z.string().email("Email inválido.").min(5, "Email muito curto!"),

  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres!")
    .max(100, "Senha muito longa!"),

  name: z
    .string()
    .min(3, "Digite o nome completo!")
    .max(100, "Nome inválido!")
    .refine((val) => /^[A-Za-zÀ-ÿ\s]+$/.test(val), {
      message: "Nome deve conter apenas letras.",
    }),

  position: z.nativeEnum(Position, {
    required_error: "Cargo exigido!",
    invalid_type_error: "Cargo inválido!",
  }),

  description: z
    .string()
    .max(255, "Descrição muito longa!")
    .optional()
    .or(z.literal("")), 

  role: z.nativeEnum(Role, {
    required_error: "Permissão exigida!",
    invalid_type_error: "Permissão inválida!",
  }),
});
