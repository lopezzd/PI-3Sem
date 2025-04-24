import prisma from "../lib/prisma";
import { PostDTO } from "../DTO/Post";
import { idValidation } from "../utils/idValidation";

class PostService {
  async create({
    title,
    content,
    authorId,
    category,
    status,
    address,
    pictures,
  }: PostDTO) {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        category,
        status,
        address,
      },
    });

    if (pictures && pictures.length > 0) {
      await prisma.picture.createMany({
        data: pictures.map(({ path }) => ({
          path,
          postId: post.id,
        })),
      });
    }

    return post;
  }

  async getAll() {
    const posts = prisma.post.findMany({
      include: {
        pictures: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  }

  async get(id: string) {
    const post = prisma.post.findUnique({
      where: {
        id
      },
      include:{
        pictures: true
      }
    });
    return post;
  }
}

export { PostService };
