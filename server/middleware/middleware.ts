import jwt from "jsonwebtoken";
import { config as dotenvConfig } from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenvConfig();

// Auth Middleware
export const decodeToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract token
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
      // Split the authorization header by space to separate "Bearer" and the token
      const [bearer, token] = authorizationHeader.split(" ");

      if (bearer === "Bearer" && token) {
        const secret = process.env.ACTIVATION_SECRET || "qwertyuiop";
        try {
          const decode = jwt.verify(token, secret);
          console.log(decode);
          req.body = decode;
        } catch (err) {
          // Verification issue
          return res.status(401).json({
            success: false,
            message: "Token is invalid",
          });
        }
        next();
      }
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};
