import { Request } from 'express';

import { UserJwtPayload } from '../../temp/user.jwt.payload';

type AuthReq = Request & {
  user: UserJwtPayload;
};

export class ReqContextProvider {
  private static request: AuthReq;

  static setRequest(request: AuthReq) {
    this.request = request;
  }

  static getAuthUser() {
    const user = this.request.user;

    return user;
  }

  static getIp() {
    return this.request.ip;
  }
}
