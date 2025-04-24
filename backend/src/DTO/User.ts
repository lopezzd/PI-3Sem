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

interface UserDTO {
  email: string;
  name: string;
  password: string;
  position: Position;
  description?: string;
  role: Role;
}

export { UserDTO };