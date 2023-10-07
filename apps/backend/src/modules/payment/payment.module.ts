import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';

import { TYPEORM_DATA_SOURCE } from '#/be/config/database/database.providers';

import { ReservationModule } from '../reservation/reservation.module';
import { PayForReservationHttpController } from './commands/pay-for-reservation/pay-for-reservation.http.controller';
import { PayForReservationCommandHandler } from './commands/pay-for-reservation/pay-for-reservation.service';
import { PaymentModel } from './db/payment.model';
import { PAYMENT_REPO } from './payment.di-tokens';

const commandHandlers: Provider[] = [PayForReservationCommandHandler];

const queryHandlers: Provider[] = [];

const repositories: Provider[] = [
  {
    provide: PAYMENT_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PaymentModel),
    inject: [TYPEORM_DATA_SOURCE],
  },
];

@Module({
  imports: [CqrsModule, ReservationModule],
  controllers: [PayForReservationHttpController],
  providers: [Logger, ...repositories, ...commandHandlers, ...queryHandlers],
  exports: [...repositories],
})
export class PaymentModule {}
