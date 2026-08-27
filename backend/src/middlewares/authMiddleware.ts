import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../exceptions/appError";

export interface AuthUser {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw new AppError("Unauthorized.", 401);
  }

  const token = header.slice(7).trim();
  if (!token) {
    throw new AppError("Unauthorized.", 401);
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new AppError("JWT_SECRET is not configured.", 500);
  }

  try {
    const decoded = jwt.verify(token, secret) as { userId?: string; id?: string; email?: string; sub?: string };

    const id = decoded.userId ?? decoded.id ?? decoded.sub;
    if (!id) {
      throw new AppError("Invalid token payload.", 401);
    }

    req.user = {
      id,
      email: decoded.email ?? "",
    };

    next();
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof jwt.TokenExpiredError) {
      throw new AppError("Token expired.", 401);
    }
    if (err instanceof jwt.JsonWebTokenError) {
      throw new AppError("Invalid token.", 401);
    }
    throw new AppError("Invalid token.", 401);
  }
}

export default authMiddleware;
