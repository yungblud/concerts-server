import Concert from "../models/Concert";
import { type CreateConcertBodyType } from "../routers/v1.0/concert/types";
import { appPrisma } from "./prismaInstance";

export const createConcert = async (
  params: CreateConcertBodyType,
): Promise<Concert> => {
  const data = await appPrisma.concert.create({
    data: params,
  });

  const concert = new Concert({
    id: data.id,
    title: data.title,
    description: data.description ?? "",
    concert_date: data.concert_date,
    created_at: data.created_at,
  });

  return concert;
};
