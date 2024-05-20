import express from 'express';
import { Request, Response, NextFunction } from "express";
import { createNewUser, loginUser, getUser } from "../controllers/user.controller";
import { createNewPost, getPosts } from "../controllers/post.controller";
import { decodeToken } from "../middleware/middleware"

export const router = express.Router();

router.get("/", (req:Request, res:Response) => {
    res.send("<h1>Hello! This is Alpha.</h1>")
});

router.post("/signup", createNewUser);

router.post("/login", loginUser);

router.get("/getUser", decodeToken, getUser);

router.post("/createPost", createNewPost);

router.get("/posts", getPosts);