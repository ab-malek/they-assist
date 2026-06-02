import { Request, Response } from "express";
import { authenticateUser, registerUser } from "../services/authService.js";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
}

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body as {
      name?: string;
      email?: string;
      password?: string;
    };

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email, and password are required" });
    }

    const result = await registerUser({ name, email, password });
    return res.status(201).json({ message: "Signup successful", ...result });
  } catch (error) {
    return res.status(400).json({ message: getErrorMessage(error) });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const result = await authenticateUser({ email, password });
    return res.status(200).json({ message: "Login successful", ...result });
  } catch (error) {
    return res.status(401).json({ message: getErrorMessage(error) });
  }
}