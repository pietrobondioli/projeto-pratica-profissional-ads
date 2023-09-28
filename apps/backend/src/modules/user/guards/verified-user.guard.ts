import { ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthRequest } from '#/be/lib/application/decorators/auth-user.decorator';
import { UserNotVerifiedError } from '../domain/errors/user-not-verified';

export const ALLOW_UNVERIFIED_USER_KEY = 'allowUnverifiedUser';
export const AllowUnverifiedUser = () =>
  SetMetadata(ALLOW_UNVERIFIED_USER_KEY, true);

@Injectable()
export class VerifiedUserGuard {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const allowUnverifiedUser = this.reflector.getAllAndOverride<boolean>(
      ALLOW_UNVERIFIED_USER_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (allowUnverifiedUser) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthRequest>();
    const loggedUser = request.user;

    // Since the purpose of this guard is to check if the user is verified, we don't need to check if the user is authenticated
    // We only check if the user is verified if the user is authenticated
    if (!loggedUser) {
      return true;
    }

    if (!loggedUser.isVerified) {
      throw new UserNotVerifiedError();
    }

    return true;
  }
}
