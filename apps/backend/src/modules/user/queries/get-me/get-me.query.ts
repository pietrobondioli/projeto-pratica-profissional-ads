import { Result } from 'neverthrow';

import { UserPayload } from '#/be/lib/application/decorators/auth-user.decorator';
import { QueryBase } from '#/be/lib/ddd/query.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';
import { User } from '../../domain/user.entity';

class Payload {
  readonly loggedUser: UserPayload;
}

export class GetMeQuery extends QueryBase<
  Payload,
  Result<User, ExceptionBase>
> {}
