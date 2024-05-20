import { User } from "../types/user.types";
import { Request, Response, NextFunction } from "express";
import { createUser, findUser, generateToken } from "../services/user.services";
import bcrypt from "bcrypt";

export const createNewUser = async (req: Request, res: Response) => {
    const data = req.body as User;
    try {
      const user = await createUser(data);
      const token = await generateToken(user);
      user.token = token;
      await user.save({validateBeforeSave: true});
      res.status(200).json({
        success: true,
        token: token,
        message: "User created successfull",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Unable to create user",
      });
    }
  };

  export const loginUser = async (req: Request, res: Response) => {
    const {email, password} = req.body as User;
  
    const user = await findUser(email);
  
    if(!user){
      res.status(400).json({
        success: false,
        message: "User does not exits",
      });
    }
  
    if (!bcrypt.compare(password, user.password)) {
      res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    const token = await generateToken(user);
  
    user.token = token;
    await user.save({validateBeforeSave: true});
    res
    .status(200)
    .json({
      success: true,
      token : token,
      message: "User loggedIn successfully",
    });
  };

  export const getUser = async (req: Request, res: Response) => {
    try {
        const email = req.body.user.email;
        const user = await findUser(email);
        return res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};