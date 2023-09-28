import { JwtAuthGuard } from '#/be/modules/auth/guards/jwt-auth.guard';
import { VerifiedUserGuard } from '#/be/modules/user/guards/verified-user.guard';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Authenticated() {
  return applyDecorators(
    ApiBearerAuth('jwt'),
    UseGuards(JwtAuthGuard),
    UseGuards(VerifiedUserGuard),
  );
}
