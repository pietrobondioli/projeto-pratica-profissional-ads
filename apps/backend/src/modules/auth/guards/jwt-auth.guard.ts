import {
  ExecutionContext,
  Injectable,
  SetMetadata,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

import { NotAuthorizedError } from '#/be/lib/exceptions/not-authorized.error';

export const PUBLIC_KEY = 'isPublic';
export const IsPublic = () => SetMetadata(PUBLIC_KEY, true);

export function Authenticated() {
  return applyDecorators(ApiBearerAuth('jwt'), UseGuards(JwtAuthGuard));
}

@Injectable()
export class JwtAuthGuard {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    let token = this.extractTokenFromHeader(request);
    if (!token) {
      token = this.extractTokenFromCookie(request);
    }

    if (!token) {
      throw new NotAuthorizedError();
    }

    try {
      const payload = await this.jwtService.verify(token);

      request['user'] = payload;
    } catch (e) {
      throw new NotAuthorizedError();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.['jwt'];
  }
}
