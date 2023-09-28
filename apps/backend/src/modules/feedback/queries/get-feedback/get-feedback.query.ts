import { Result } from 'neverthrow';

import { QueryBase } from '#/be/lib/ddd/query.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';
import { Feedback } from '../../domain/feedback.entity';

class Payload {
  readonly feedbackId: string;
}

export class GetFeedbackQuery extends QueryBase<
  Payload,
  Result<Feedback, ExceptionBase>
> {}
