import prisma from "../lib/prisma";
import { PostDTO } from "../DTO/Post";

class PostService {
    async execute({
        title,
        content,
        authorId,
        category,
        status,
        address,
        pictures
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
      
}

export { PostService };
