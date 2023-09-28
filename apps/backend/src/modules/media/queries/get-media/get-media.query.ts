import { Result } from 'neverthrow';

import { QueryBase } from '#/be/lib/ddd/query.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';
import { Media } from '../../domain/media.entity';

class Payload {
  readonly mediaId: string;
}

export class GetMediaQuery extends QueryBase<
  Payload,
  Result<
    {
      readonly media: Media;
      readonly url: string;
    },
    ExceptionBase
  >
> {}
