import { ConcertPosterSchemaType } from "../schema/concertPoster";

export default class ConcertPoster {
    constructor(private data: ConcertPosterSchemaType) {}
    serialize(): ConcertPosterSchemaType {
        return this.data
    }
}