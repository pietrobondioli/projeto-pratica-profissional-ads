import { RootConfig } from '#/be/config/env/env.types';
import { NotAuthorizedError } from '#/be/lib/exceptions/not-authorized.error';
import { ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

export const PUBLIC_KEY = 'isPublic';
export const IsPublic = () => SetMetadata(PUBLIC_KEY, true);

@Injectable()
export class JwtAuthGuard {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly rootConfig: RootConfig,
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
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new NotAuthorizedError();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.rootConfig.jwt.secret,
      });

      request['user'] = payload;
    } catch {
      throw new NotAuthorizedError();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['Authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
