import prisma from "../lib/prisma";
import { UserDTO } from "../DTO/User";
import { LoginDTO } from "../DTO/Login";

class UserService {
  async create({
    email,
    name,
    password,
    position,
    description,
    role,
  }: UserDTO) {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
        position,
        description,
        role,
      },
    });

    return user;
  }

  async login({ email, password }: LoginDTO) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }


    if (password !== user.password) {
      throw new Error("Credenciais inválidas.");
    }

    return {
      id: user.id
    };
  }
}

export { UserService };
