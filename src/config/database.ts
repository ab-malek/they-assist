import mongoose from "mongoose";
import { createUser, findUserByEmail } from "../services/userService.js";

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
export const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "myapi";

const DEFAULT_USER = {
  name: "Abdul",
  email: "abdul@example.com",
  password: "password123"
};

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const connection = await mongoose.connect(MONGODB_URI, {
    dbName: MONGODB_DB_NAME
  });

  await seedDefaultUser();

  return connection;
}

async function seedDefaultUser() {
  const existingUser = await findUserByEmail(DEFAULT_USER.email);

  if (!existingUser) {
    await createUser(DEFAULT_USER);
  }
}