import { type UserSchemaType } from "../schema/user";
import { type UserSerialize } from "./types";

export default class User {
  constructor(private readonly data: UserSchemaType) {}
  public getId(): string {
    return this.data.id;
  }

  public getEmail(): string {
    return this.data.email;
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

  public serialize(): UserSerialize {
    return {
      id: this.data.id,
      email: this.data.email,
      created_at: this.data.created_at,
    };
  }
}
