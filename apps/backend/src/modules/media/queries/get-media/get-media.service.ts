import { AwsS3MediaService } from '#/be/lib/services/media-storage/aws-s3-media.service';
import { QueryResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'neverthrow';
import { MediaRepo } from '../../db/media.model';
import { MediaNotFoundError } from '../../domain/errors/media-not-found.error';
import { MEDIA_REPO } from '../../media.di-tokens';
import { GetMediaQuery } from './get-media.query';

@QueryHandler(GetMediaQuery)
export class GetMediaQueryHandler
  implements IInferredQueryHandler<GetMediaQuery>
{
  constructor(
    @Inject(MEDIA_REPO)
    private readonly mediaRepo: MediaRepo,
    private readonly awsS3MediaService: AwsS3MediaService,
  ) {}

  async execute(query: GetMediaQuery): Promise<QueryResult<GetMediaQuery>> {
    const { mediaId } = query.payload;

    const media = await this.mediaRepo.findOneBy({
      id: mediaId,
    });

    if (!media) {
      return new Err(new MediaNotFoundError());
    }

    const mediaUrl = this.awsS3MediaService.getFileUrl(media.key, media.bucket);

    return new Ok({
      media,
      url: mediaUrl,
    });
  }
}
