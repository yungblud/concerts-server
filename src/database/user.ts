import User from "../models/User";
import { type UserConnectedSNSSchemaType } from "../schema/user";
import { appPrisma } from "./prismaInstance";

export const getUserById = async (id: string): Promise<User | null> => {
  const data = await appPrisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      password: false,
      is_staff: true,
      connected_sns: true,
      created_at: true,
    },
  });
  if (data == null) return null;
  const user = new User({
    id: data.id,
    email: data.email,
    is_staff: data.is_staff,
    password: null,
    connected_sns: data.connected_sns as UserConnectedSNSSchemaType,
    created_at: data.created_at,
  });

  return user;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const data = await appPrisma.user.findUnique({
    where: {
      email,
    },
  });
  if (data == null) return null;
  const user = new User({
    id: data.id,
    email: data.email,
    is_staff: data.is_staff,
    password: null,
    connected_sns: data.connected_sns as UserConnectedSNSSchemaType,
    created_at: data.created_at,
  });

  return user;
};

export const getUserAuthInfoByEmail = async (
  email: string,
): Promise<User | null> => {
  const data = await appPrisma.user.findUnique({
    where: {
      email,
    },
    select: {
      password: true,
      password_salt: true,
      email: true,
      id: true,
      created_at: true,
    },
  });

  if (data == null) return null;

  const user = new User({
    id: data.id,
    email: data.email,
    created_at: data.created_at,
    password: data.password,
    password_salt: data.password_salt,
    is_staff: false,
  });
  return user;
};

export const createUser = async (params: {
  email: string;
  password?: string;
  password_salt?: string;
  connected_sns: UserConnectedSNSSchemaType;
}): Promise<User | null> => {
  const {
    email,
    password,
    connected_sns: connectedSNS,
    password_salt: passwordSalt,
  } = params;
  const data = await appPrisma.user.create({
    data: {
      email,
      password,
      connected_sns: connectedSNS,
      is_staff: false,
      password_salt: passwordSalt,
    },
  });

  const user = new User({
    id: data.id,
    email: data.email,
    is_staff: data.is_staff,
    password: null,
    connected_sns: data.connected_sns as UserConnectedSNSSchemaType,
    created_at: data.created_at,
  });

  return user;
};
