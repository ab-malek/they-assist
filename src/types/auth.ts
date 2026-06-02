import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export interface AuthPayload {
  id: string;
  email: string;
  name: string;
}