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

interface PostDTO {
  title: string;
  content: string;
  authorId: string;
  category: Category;
  status: Status;
  address: string;
  pictures?: { path: string }[];
}


export { PostDTO };
