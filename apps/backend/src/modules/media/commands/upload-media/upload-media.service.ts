import { AwsS3MediaService } from '#/be/lib/services/media-storage/aws-s3-media.service';
import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Ok } from 'neverthrow';
import { MediaRepo } from '../../db/media.model';
import { MediaAggregate } from '../../domain/media.aggregate';
import { Media } from '../../domain/media.entity';
import { MEDIA_REPO } from '../../media.di-tokens';
import { UploadMediaCommand } from './upload-media.command';

@CommandHandler(UploadMediaCommand)
export class UploadMediaCommandHandler
  implements IInferredCommandHandler<UploadMediaCommand>
{
  constructor(
    @Inject(MEDIA_REPO)
    private readonly mediaRepo: MediaRepo,
    private readonly mediaStorageService: AwsS3MediaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: UploadMediaCommand,
  ): Promise<CommandResult<UploadMediaCommand>> {
    try {
      const { loggedUser, buffer, ...mediaFile } = command.payload;

      const uploadedMedia = await this.mediaStorageService.uploadFile({
        buffer,
        ...mediaFile,
      });

      const media = new Media(loggedUser.id);
      media.key = uploadedMedia.key;
      media.bucket = uploadedMedia.bucket;
      media.mimeType = uploadedMedia.mimeType;

      await this.mediaRepo.save(media);

      MediaAggregate.publishEvents(this.eventEmitter);

      return new Ok('');
    } finally {
      MediaAggregate.clearEvents();
    }
  }
}
