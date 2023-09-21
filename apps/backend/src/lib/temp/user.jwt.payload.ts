export class UserJwtPayload {
  constructor(
    public readonly id: string,
    public readonly email: string,
  ) {}
}
