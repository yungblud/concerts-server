import { type AccountAuthCodeSchemaType } from "../schema/accountAuthCode";

export default class AccountAuthCode {
  constructor(private readonly data: AccountAuthCodeSchemaType) {}

  public getAuthCode(): string {
    return this.data.auth_code;
  }
}
