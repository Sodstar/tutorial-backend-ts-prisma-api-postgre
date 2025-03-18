import { Router } from "express";

import {
  getAllPosts,
  getPostById,
} from "../controllers/post.controller";

const bookRouter = Router();

bookRouter.get("/", getAllPosts);
bookRouter.get("/:id", getPostById);

export default bookRouter;
