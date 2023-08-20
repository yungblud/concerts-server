import { type RefreshTokenSchemaType } from "../schema/refreshToken";

export default class RefreshToken {
  constructor(private readonly data: RefreshTokenSchemaType) {}

  public getToken(): string {
    return this.data.token;
  }
}
