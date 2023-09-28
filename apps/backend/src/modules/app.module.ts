import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseModule } from '../config/database/database.module';
import { EnvModule, rootConfig } from '../config/env/env.module';

import { MailModule } from '../lib/services/mail/mail.module';
import { MediaStorageModule } from '../lib/services/media-storage/media-storage.module';

import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { EquipmentModule } from './equipment/equipment.module';
import { FeedbackModule } from './feedback/feedback.module';
import { MediaModule } from './media/media.module';
import { NotificationModule } from './notification/notification.module';
import { PaymentModule } from './payment/payment.module';
import { ReservationModule } from './reservation/reservation.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // Config
    EnvModule,
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: rootConfig.jwt.secret,
      signOptions: { expiresIn: rootConfig.jwt.signOptions.expiresIn },
    }),

    // Libraries
    EventEmitterModule.forRoot(),
    CqrsModule,
    MediaStorageModule,
    MailModule,

    // Modules
    AuthModule,
    UserModule,
    ChatModule,
    EquipmentModule,
    FeedbackModule,
    MediaModule,
    NotificationModule,
    PaymentModule,
    ReservationModule,
  ],
})
export class AppModule {}
