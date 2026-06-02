import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";
import { AuthenticatedRequest, AuthPayload } from "../types/auth.js";

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid authorization header" });
  }

  const token = header.slice(7);

  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthPayload;
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}