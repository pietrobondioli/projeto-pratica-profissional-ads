import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';

import { LoginHttpController } from './commands/login/login.http.controller';

@Module({
  imports: [JwtModule, UserModule],
  providers: [JwtModule],
  controllers: [LoginHttpController],
})
export class AuthModule {}
