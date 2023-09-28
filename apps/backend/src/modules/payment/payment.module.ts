import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';

import { TYPEORM_DATA_SOURCE } from '#/be/config/database/database.providers';
import { PaymentModel } from './db/payment.model';
import { PAYMENT_REPO } from './payment.di-tokens';

const commandHandlers: Provider[] = [];

const queryHandlers: Provider[] = [];

const mappers: Provider[] = [];

const repositories: Provider[] = [
  {
    provide: PAYMENT_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PaymentModel),
    inject: [TYPEORM_DATA_SOURCE],
  },
];

@Module({
  imports: [CqrsModule],
  controllers: [],
  providers: [
    Logger,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
  ],
  exports: [...repositories],
})
export class PaymentModule {}
