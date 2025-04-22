import prisma from "../lib/prisma";
import { Request, Response } from "express";
import { loginValidation } from "../utils/loginValidation";

export const createUser = async (req: Request, res: Response) => {

  try {

    const { email, name, password, position, description, role } = req.body;

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
        position,
        description,
        role,
      },
    });

    return res
      .status(201)
      .json({ message: "Usuário criado com sucesso", post: newUser });

  } catch (error) {

    console.error(`Erro ao criar usuário: , ${error}`);
    return res.status(500).json({ error: "Erro interno no servidor" });
    
  }
};

export const findLogin = async (req: Request, res: Response) => {
  try {
    const parsedData = loginValidation.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        error: "Dados inválidos.",
        details: parsedData.error.format(),
      });
    }

    const { email, password } = parsedData.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
};
