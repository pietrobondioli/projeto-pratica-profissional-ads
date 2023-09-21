import express from 'express';
import { UserJwtPayload } from '../../temp/user.jwt.payload';

export class ReqContextProvider {
  private static request: express.Request;

  static setRequest(request: express.Request) {
    this.request = request;
  }

  static getAuthUser() {
    const user = <UserJwtPayload>this.request.user;

    return user;
  }

  static getIp() {
    return this.request.ip;
  }
}
