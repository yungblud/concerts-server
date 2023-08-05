import { ConcertSchemaType } from "../schema/concert";

export default class Concert {
    constructor(private data: ConcertSchemaType) {

    }

    serialize(): ConcertSchemaType {
        return this.data
    }
}