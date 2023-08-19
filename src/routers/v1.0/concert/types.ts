import { z } from "zod";

export const CreateConcertBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  concert_date: z.string(),
});

export type CreateConcertBodyType = z.infer<typeof CreateConcertBodySchema>;
