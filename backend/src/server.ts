import Fastify from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors";
import fastifyMultipart from '@fastify/multipart';


const app = Fastify({logger: true});

const port = 3333;

const start = async () => {

    await app.register(fastifyMultipart);
    await app.register(cors);
    await app.register(routes);

    try{
        await app.listen({port})
    }catch(err){
        process.exit(1);
    }
}

start();