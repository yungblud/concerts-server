import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import jwtDecode from "jwt-decode";
import { addMinutes } from "date-fns";
import { getUserById } from "../database/user";
import type User from "../models/User";
import { type FastifyRequest } from "fastify";

export interface JWTPayload {
  id: string;
  email: string;
}

dotenv.config();

const { JWT_SECRET: jwtSecret } = process.env;

const AUTH_TOKEN_ALIVE_MINUTES = 30;

export function generateAuthToken(payload: JWTPayload): string {
  if (typeof jwtSecret === "undefined") {
    throw new Error("no secret");
  }
  const defaultIATDate = new Date();
  return jwt.sign(
    {
      ...payload,
      iat: Math.floor(defaultIATDate.getTime() / 1000),
      exp: Math.floor(
        addMinutes(defaultIATDate, AUTH_TOKEN_ALIVE_MINUTES).getTime() / 1000,
      ),
    },
    jwtSecret,
  );
}

export function decodeAuthToken(
  token: string,
): (JWTPayload & { iat: number; exp: number }) | null {
  try {
    const decoded = jwtDecode<JWTPayload & { iat: number; exp: number }>(token);
    return decoded;
  } catch (e) {
    return null;
  }
}

export function generateRefreshToken(
  payload: JWTPayload & { authToken: string },
): string {
  if (typeof jwtSecret === "undefined") {
    throw new Error("no secret");
  }
  return jwt.sign(payload, jwtSecret);
}

export async function getUserByAuthToken(token: string): Promise<User | null> {
  const info = decodeAuthToken(token);
  if (info == null) return null;
  const user = await getUserById(info.id);
  return user;
}

export function getAuthTokenFromRequest(
  req: FastifyRequest,
): string | undefined {
  return req.headers.authorization;
}
