import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import jwtDecode from "jwt-decode";

export interface JWTPayload {
  id: string;
  email: string;
}

dotenv.config();

const { JWT_SECRET: jwtSecret } = process.env;

export function generateAuthToken(payload: JWTPayload): string {
  if (typeof jwtSecret === "undefined") {
    throw new Error("no secret");
  }
  return jwt.sign(payload, jwtSecret);
}

export function decodeAuthToken(token: string): JWTPayload | null {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return decoded;
  } catch (e) {
    return null;
  }
}
