import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/User";
import { UserDTO } from "../DTO/User";
import { UserValidation } from "../utils/User";
import { loginValidation } from "../utils/loginValidation";
import prisma from "../lib/prisma";

class UserController {
  async create(req: FastifyRequest, res: FastifyReply) {
    const parsedData = UserValidation.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).send({
        error: "Dados inválidos.",
        details: parsedData.error.format(),
      });
    }

    const { email, name, password, position, description, role } =
      req.body as UserDTO;

    const userService = new UserService();

    const user = await userService.create({
      email,
      name,
      password,
      position,
      description,
      role,
    });

    res.send(user);
  }

  async Login(req: FastifyRequest, res: FastifyReply) {
    const parsedData = loginValidation.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).send({
        error: "Dados inválidos.",
        details: parsedData.error.format(),
      });
    }

    const { email, password } = parsedData.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).send({ error: "Usuário não encontrado." });
    }

    if (password !== user.password) {
      return res.status(401).send({ error: "Credenciais inválidas." });
    }

    return res.status(200).send({
      id: user.id,
    });
  }
}

export { UserController };
