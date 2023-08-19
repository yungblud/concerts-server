import { type ConcertSchemaType } from "../schema/concert";

export default class Concert {
  constructor(private readonly data: ConcertSchemaType) {}

  serialize(): ConcertSchemaType {
    return this.data;
  }
}
