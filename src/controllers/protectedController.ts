import { Response } from "express";
import { AuthenticatedRequest } from "../types/auth.js";

export function getProtectedMessage(req: AuthenticatedRequest, res: Response) {
  return res.status(200).json({
    message: "You reached a protected route",
    user: req.user
  });
}