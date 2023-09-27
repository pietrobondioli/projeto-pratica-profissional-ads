import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';

import { CqrsModule } from '@nestjs/cqrs';
import { LoginHttpController } from './commands/login/login.http.controller';

@Module({
  imports: [CqrsModule, JwtModule, UserModule],
  providers: [JwtModule],
  controllers: [LoginHttpController],
})
export class AuthModule {}
