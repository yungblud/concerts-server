import { type ConcertPosterSchemaType } from "../schema/concertPoster";

export default class ConcertPoster {
  constructor(private readonly data: ConcertPosterSchemaType) {}
  serialize(): ConcertPosterSchemaType {
    return this.data;
  }
}
