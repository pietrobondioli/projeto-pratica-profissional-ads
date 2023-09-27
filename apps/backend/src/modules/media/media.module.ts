import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { MediaModel } from './db/media.model';
import { MEDIA_REPO } from './media.di-tokens';

const commandHandlers: Provider[] = [];

const queryHandlers: Provider[] = [];

const mappers: Provider[] = [];

const repositories: Provider[] = [
  {
    provide: MEDIA_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MediaModel),
    inject: ['DATA_SOURCE'],
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
export class MediaModule {}
