import { z } from "zod";

export const ConcertPosterSchema = z.object({
  id: z.string(),
  img_url: z.string(),
  created_at: z.date(),
});

export type ConcertPosterSchemaType = z.infer<typeof ConcertPosterSchema>;
