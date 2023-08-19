import { z } from "zod";

export const ConcertSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  concert_date: z.date(),
  created_at: z.date(),
});

export type ConcertSchemaType = z.infer<typeof ConcertSchema>;
