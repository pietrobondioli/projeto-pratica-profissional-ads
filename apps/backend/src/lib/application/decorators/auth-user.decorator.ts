import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export type UserPayload = {
  id: string;
  email: string;
  isVerified: boolean;
};

export type AuthRequest = Request & {
  user?: UserPayload;
};

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    return request.user;
  },
);
