import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { DatabaseModule } from '../config/database/database.module';
import { EnvModule } from '../config/env/env.module';

import { ChatModule } from './chat/chat.module';
import { EquipmentModule } from './equipment/equipment.module';
import { FeedbackModule } from './feedback/feedback.module';
import { MediaModule } from './media/media.module';
import { NotificationModule } from './notification/notification.module';
import { PaymentModule } from './payment/payment.module';
import { ReservationModule } from './reservation/reservation.module';
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
    ChatModule,
    EquipmentModule,
    FeedbackModule,
    MediaModule,
    NotificationModule,
    PaymentModule,
    ReservationModule,
  ],
  controllers: [],
  providers: [...interceptors],
})
export class AppModule {}
