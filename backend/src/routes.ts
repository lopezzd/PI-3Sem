import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "./controllers/User";
import { PostController } from "./controllers/Post";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){
    fastify.post("/register", async(req: FastifyRequest, rel: FastifyReply) =>{
        return new UserController().createUser(req, rel);
    })

    fastify.post("/login", async(req: FastifyRequest, rel: FastifyReply) =>{
        return new UserController().Login(req, rel);
    })

    fastify.post("/posts", async(req: FastifyRequest, rel: FastifyReply) =>{
        return new PostController().createPost(req, rel);
    })

    fastify.get("/posts", async(req: FastifyRequest, rel: FastifyReply) =>{
        return new PostController().createPost(req, rel);
    })
}