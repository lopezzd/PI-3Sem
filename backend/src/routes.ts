import express, { Router } from "express";
import findPosts from "../src/controller/Post";
import config from "./lib/multer"
import multer from "multer";


const upload = multer(config);

export const router: Router = express.Router();

router.post("/posts", upload.array("images"), createPost());
router.get("/posts", findPosts);
router.post("/posts/${id}", id, findPost);


