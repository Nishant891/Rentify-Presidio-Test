import { Post } from "../types/posts.types";
import { Request, Response, NextFunction } from "express";
import { createPost, getAllPosts } from "../services/post.services";
import bcrypt from "bcrypt";

export const createNewPost = async (req: Request, res: Response) => {
    const data = req.body as Post;
    console.log(data);
    try {
      const post = await createPost(data);
      res.status(200).json({
        success: true,
        message: "Post created successfull",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Unable to create post",
      });
    }
  };

export const getPosts = async (req: Request, res: Response) => {
    try {
      const posts = await getAllPosts();
      res.status(200).json({
        success: true,
        posts: posts,
        message: "Post created successfull",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Unable to create post",
      });
    }
  };