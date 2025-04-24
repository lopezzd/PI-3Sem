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


  export const PostValidation = z.object({
    title: z.string().min(5).max(55),
    content: z.string().max(255),
    authorId: z.string().length(36).refine((val) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(val), {
      message: "ID deve ser um UUID válido.",
    }),
    category: z.nativeEnum(Category),
    status: z.nativeEnum(Status),
    address: z.string().min(10).max(255),
    pictures: z.array(z.object({
      path: z.string().min(1)
    })).optional()
  });
  
