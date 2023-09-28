import { Request } from 'express';

type AuthReq = Request & {
  user: { id: string };
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
