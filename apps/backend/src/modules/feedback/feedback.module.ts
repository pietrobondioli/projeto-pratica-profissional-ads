import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';

import { TYPEORM_DATA_SOURCE } from '#/be/config/database/database.providers';

import { ReservationModule } from '../reservation/reservation.module';
import { UserModule } from '../user/user.module';

import { CreateFeedbackHttpController } from './commands/create-feedback/create-feedback.http.controller';
import { CreateFeedbackCommandHandler } from './commands/create-feedback/create-feedback.service';
import { DeleteFeedbackHttpController } from './commands/delete-feedback/delete-feedback.http.controller';
import { DeleteFeedbackCommandHandler } from './commands/delete-feedback/delete-feedback.service';
import { UpdateFeedbackHttpController } from './commands/update-feedback/update-feedback.http.controller';
import { UpdateFeedbackCommandHandler } from './commands/update-feedback/update-feedback.service';
import { FeedbackModel } from './db/feedback.model';
import { FEEDBACK_REPO } from './feedback.di-tokens';

const commandHandlers: Provider[] = [
  CreateFeedbackCommandHandler,
  DeleteFeedbackCommandHandler,
  UpdateFeedbackCommandHandler,
];

const queryHandlers: Provider[] = [];

const mappers: Provider[] = [];

const repositories: Provider[] = [
  {
    provide: FEEDBACK_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FeedbackModel),
    inject: [TYPEORM_DATA_SOURCE],
  },
];

@Module({
  imports: [CqrsModule, UserModule, ReservationModule],
  controllers: [
    CreateFeedbackHttpController,
    DeleteFeedbackHttpController,
    UpdateFeedbackHttpController,
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
export class FeedbackModule {}
