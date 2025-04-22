import { z } from "zod";

enum Category {
    MUITO_BAIXO = "MUITO_BAIXO",
    BAIXO = "BAIXO",
    MODERADO = "MODERADO",
    ALTO = "ALTO",
    MUITO_ALTO = "MUITO_ALTO"
  }
  
  enum Status {
    ATIVO = "ATIVO",
    INATIVO = "INATIVO",
    EM_ANALISE = "EM_ANALISE",
    REJEITADO = "REJEITADO",
    CONCLUIDO = "CONCLUIDO"
  }


export const registerValidation = z.object({
  title: z.string().min(5, "Título muito curto!").max(55, "Título muito longo!"),

  content: z
    .string()
    .max(255, "Número máximo de caracteres atingido!"),

  authorId: z
    .string()
    .length(25, "ID inválido")
    .refine((val) => /^c[^\s-]{24}$/.test(val), {
        message: "ID deve ser um CUID válido.",
      }),
      

  category: z.nativeEnum(Category, {
    required_error: "Categoria exigida!",
    invalid_type_error: "Categoria inválida!",
  }),

  status: z
    .nativeEnum(Status),

    address: z.string()
    .min(10)
    .max(255)
});
