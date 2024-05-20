import {PostModel} from "../schemas/post.schema"
import { Post } from "../types/posts.types";
import dotenv from 'dotenv';

dotenv.config();

export const createPost = async (post : Post) => {
    return await PostModel.create(post);
} 

export const getAllPosts = async () => {
    return await PostModel.find();
} 