import { UserSchemaType } from "../schema/user";

export default class User {
    constructor (private data: UserSchemaType) {}
    public getId(): string {
        return this.data.id
    }
    public getPassword(): string | undefined | null {
        return this.data.password
    }
    public getPasswordSalt(): string | undefined | null {
        return this.data.password_salt
    }
    public isSNSUser(): boolean {
       return !!this.data.connected_sns
    }
    public serialize(): UserSchemaType {
        return this.data
    }
}