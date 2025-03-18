import { Request, Response } from "express";
import { PostService } from "../services/postService";
import logger from "../utils/log";
import { handleError } from "../utils/errorHandler";

// getAllPots
export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostService.getAllPosts();
    logger.info(`${req.ip} - Retrieved all posts`);
    res.status(200).json({ data: posts });
  } catch (error) {
    handleError(res, error, "Error fetching post");
  }
};

// getPostById
export const getPostById = async (req, res) => {
  try {
    const post = await PostService.getPostById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.status(200).json({ data: post });
  } catch (error) {
    handleError(res, error, "Error fetching post");
  }

  function handleError(res: Response, error: any, message: string): void {
    console.error(message, error);
    logger.error(`${message}: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};