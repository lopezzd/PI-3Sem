import { FastifyReply, FastifyRequest } from "fastify";
import { PostService } from "../services/Post";
import { PostValidation } from "../utils/Post";
import path from "path";
import fs from "fs";
import { pipeline } from "stream/promises";

class PostController {
  async createPost(req: FastifyRequest, res: FastifyReply) {
    const parts = (req as any).parts();
    const pictures: string[] = [];
    const body: any = {};

    for await (const part of parts) {
      if (part.type === "file") {
        const filename = `${Date.now()}-${part.filename}`;
        const filepath = path.join(__dirname, "..", "..", "uploads", filename);

        await pipeline(part.file, fs.createWriteStream(filepath));
        pictures.push(filename);
      } else if (part.type === "field") {
        body[part.fieldname] = part.value;
      }
    }

    const parsedData = PostValidation.safeParse({
      ...body,
      pictures: pictures.map((path) => ({ path })),
    });

    if (!parsedData.success) {
      return res.status(400).send({
        error: "Dados inválidos.",
        details: parsedData.error.format(),
      });
    }

    const postService = new PostService();

    const post = await postService.execute({
      ...parsedData.data,
    });

    res.send(post);
  }

  async getAllPosts(req: FastifyRequest, res: FastifyReply){
    
  }
}

export { PostController };
