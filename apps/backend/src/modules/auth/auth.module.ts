import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';

import { CqrsModule } from '@nestjs/cqrs';
import { LoginHttpController } from './commands/login/login.http.controller';
import { LoginCommandHandler } from './commands/login/login.service';

const commandHandlers: Provider[] = [LoginCommandHandler];

@Module({
  imports: [CqrsModule, JwtModule, UserModule],
  providers: [...commandHandlers],
  controllers: [LoginHttpController],
})
export class AuthModule {}
