import prisma from "../lib/prisma";
import { Request, Response } from "express";
import { idValidation } from "../utils/idValidation";

const createPost = async (req: Request, res: Response) => {
  const { title, content, authorId, category, status, address } = req.body;
  const requestImages = req.files as Express.Multer.File[];

  const images = requestImages.map((image) => {
    return {
      path: image.filename,
    };
  });

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId,
      category,
      status,
      address,
      pictures: {
        create: images,
      },
    },
  });

  return res.json(post);
};

const findPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        pictures: {
          select: {
            path: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            position: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(`Erro ao buscar posts: ${error}`);
    res.status(500).json({ error: `Erro ao buscar posts` });
  }
};

const findPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const validation = idValidation.safeParse({ id });
    if (!validation.success) {
      return res
        .status(400)
        .json({ error: validation.error.errors[0].message });
    }

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return res.status(404).json({ error: "Post não encontrado." });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(`Erro ao buscar post: ${error}`);
    res.status(500).json({ error: `Erro ao buscar post` });
  }
};

module.exports = {
  createPost,
  findPost,
  findPosts
};