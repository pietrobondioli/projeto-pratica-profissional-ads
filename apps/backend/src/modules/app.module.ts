import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { DatabaseModule } from '../config/database/database.module';
import { EnvModule } from '../config/env/env.module';

import { UserModule } from './user/user.module';

const interceptors = [];

@Module({
  imports: [
    // Config
    EnvModule,

    // Libraries
    DatabaseModule,
    EventEmitterModule.forRoot(),
    CqrsModule,

    // Modules
    UserModule,
  ],
  controllers: [],
  providers: [...interceptors],
})
export class AppModule {}
