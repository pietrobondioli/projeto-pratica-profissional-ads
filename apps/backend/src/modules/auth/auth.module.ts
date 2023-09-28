import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserModule } from '../user/user.module';

import { LoginHttpController } from './commands/login/login.http.controller';
import { LoginCommandHandler } from './commands/login/login.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [CqrsModule, UserModule],
  providers: [LoginCommandHandler, JwtAuthGuard],
  controllers: [LoginHttpController],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
