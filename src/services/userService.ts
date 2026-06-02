import { PublicUser, User, UserModel } from "../models/user.js";
import bcrypt from "bcrypt";

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

function toPublicUser(user: User): PublicUser {
  return {
    name: user.name,
    email: user.email
  };
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const normalizedEmail = email.toLowerCase();
  const user = await UserModel.findOne({ email: normalizedEmail }).exec();

  return user ? user.toObject() : undefined;
}

export async function findUserById(id: number): Promise<User | undefined> {
  const user = await UserModel.findOne({ id }).exec();

  return user ? user.toObject() : undefined;
}

export async function createUser(input: CreateUserInput): Promise<User> {
  const hashed = await bcrypt.hash(input.password, 10);

  const user = await UserModel.create({
    name: input.name,
    email: input.email.toLowerCase(),
    password: hashed
  });

  return user.toObject();
}

export async function getUsers(): Promise<PublicUser[]> {
  const users = await UserModel.find().sort({ createdAt: -1 }).exec();

  return users.map((user) => toPublicUser(user.toObject()));
}