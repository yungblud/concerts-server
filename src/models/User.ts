import { type UserSchemaType } from "../schema/user";

export default class User {
  constructor(private readonly data: UserSchemaType) {}
  public getId(): string {
    return this.data.id;
  }

  public getPassword(): string | undefined | null {
    return this.data.password;
  }

  public getPasswordSalt(): string | undefined | null {
    return this.data.password_salt;
  }

  public isSNSUser(): boolean {
    if (this.data.connected_sns === null) return false;
    if (this.data.connected_sns === undefined) return false;
    return true;
  }

  public isStaffUesr(): boolean {
    return this.data.is_staff;
  }

  public serialize(): UserSchemaType {
    return this.data;
  }
}
