import { Result } from 'neverthrow';

import { QueryBase } from '#/be/lib/ddd/query.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

import { User } from '../../domain/user.entity';

class Payload {
  readonly userId: string;
}

export class GetUserQuery extends QueryBase<
  Payload,
  Result<User, ExceptionBase>
> {}
