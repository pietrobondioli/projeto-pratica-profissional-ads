import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';

import { TYPEORM_DATA_SOURCE } from '#/be/config/database/database.providers';
import { MediaStorageModule } from '#/be/lib/services/media-storage/media-storage.module';

import { UploadMediaHttpController } from './commands/upload-media/upload-media.http.controller';
import { UploadMediaCommandHandler } from './commands/upload-media/upload-media.service';
import { MediaModel } from './db/media.model';
import { MEDIA_REPO } from './media.di-tokens';
import { GetMediaHttpController } from './queries/get-media/get-media.http.controller';
import { GetMediaQueryHandler } from './queries/get-media/get-media.service';

const commandHandlers: Provider[] = [UploadMediaCommandHandler];

const queryHandlers: Provider[] = [GetMediaQueryHandler];

const mappers: Provider[] = [];

const repositories: Provider[] = [
  {
    provide: MEDIA_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MediaModel),
    inject: [TYPEORM_DATA_SOURCE],
  },
];

@Module({
  imports: [CqrsModule, MediaStorageModule],
  controllers: [UploadMediaHttpController, GetMediaHttpController],
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
