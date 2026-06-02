import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/jwt.js";
import { AuthPayload } from "../types/auth.js";
import { createUser, findUserByEmail } from "./userService.js";
import bcrypt from "bcrypt";

export interface CredentialsInput {
  name?: string;
  email: string;
  password: string;
}

export function signToken(payload: AuthPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"]
  });
}

export async function registerUser(input: Required<Pick<CredentialsInput, "name" | "email" | "password">>) {
  const existingUser = await findUserByEmail(input.email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await createUser(input);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  };
}

export async function authenticateUser(input: CredentialsInput) {
  const user = await findUserByEmail(input.email);

  if (!user || !(await bcrypt.compare(input.password, user.password))) {
    throw new Error("Invalid email or password");
  }

  const token = signToken({ id: user._id.toString(), email: user.email, name: user.name });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    },
    token
  };
}