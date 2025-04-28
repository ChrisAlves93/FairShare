import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../utils/validateEnv";
import { statusCode } from "../types/types";

declare global {
  namespace Express {
    interface Request {
      email: string;
      password: string;
      userId?: string; // Change to string
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(statusCode.authError).json({
      message: "No token provided",
    });
  }

  
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(statusCode.authError).json({
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
