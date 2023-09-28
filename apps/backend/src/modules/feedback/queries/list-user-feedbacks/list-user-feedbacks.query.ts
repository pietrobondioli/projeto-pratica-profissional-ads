import { Result } from 'neverthrow';

import {
  PaginatedQueryBase,
  PaginatedQueryPayloadBase,
  PaginatedQueryResultBase,
} from '#/be/lib/ddd/query.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';
import { Feedback } from '../../domain/feedback.entity';

class Payload extends PaginatedQueryPayloadBase {
  readonly userId: string;
}

export class ListUserFeedbacksQuery extends PaginatedQueryBase<
  Payload,
  Result<PaginatedQueryResultBase<Feedback>, ExceptionBase>
> {}
