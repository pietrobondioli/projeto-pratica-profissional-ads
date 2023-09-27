import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';

import { CancelReservationHttpController } from './commands/cancel-reservation/cancel-reservation.http.controller';
import { CancelReservationCommandHandler } from './commands/cancel-reservation/cancel-reservation.service';
import { CreateReservationHttpController } from './commands/create-reservation/create-reservation.http.controller';
import { CreateReservationCommandHandler } from './commands/create-reservation/create-reservation.service';
import { ReservationModel } from './db/reservation.model';
import { GetReservationHttpController } from './queries/get-reservation/get-reservation.http.controller';
import { GetReservationQueryHandler } from './queries/get-reservation/get-reservation.service';
import { ListUserReservationsHttpController } from './queries/list-user-reservations/list-user-reservations.http.controller';
import { ListUserReservationsQueryHandler } from './queries/list-user-reservations/list-user-reservations.service';
import { RESERVATION_REPO } from './reservation.di-tokens';

const commandHandlers: Provider[] = [
  CreateReservationCommandHandler,
  CancelReservationCommandHandler,
];

const queryHandlers: Provider[] = [
  GetReservationQueryHandler,
  ListUserReservationsQueryHandler,
];

const mappers: Provider[] = [];

const repositories: Provider[] = [
  {
    provide: RESERVATION_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ReservationModel),
    inject: ['DATA_SOURCE'],
  },
];

@Module({
  imports: [CqrsModule],
  controllers: [
    CreateReservationHttpController,
    CancelReservationHttpController,
    GetReservationHttpController,
    ListUserReservationsHttpController,
  ],
  providers: [
    Logger,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
  ],
  exports: [...repositories],
})
export class ReservationModule {}
