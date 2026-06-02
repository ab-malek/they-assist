import mongoose, { Schema } from "mongoose";

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

export interface PublicUser {
  name: string;
  email: string;
}

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export const UserModel = mongoose.model<User>("User", userSchema);