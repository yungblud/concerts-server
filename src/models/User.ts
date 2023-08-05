import { UserSchemaType } from "../schema/user";

export default class User {
    constructor (private data: UserSchemaType) {}
    serialize(): UserSchemaType {
        return this.data
    }
}