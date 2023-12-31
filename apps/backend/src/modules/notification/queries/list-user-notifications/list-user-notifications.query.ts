import { Result } from 'neverthrow';

import { UserPayload } from '#/be/lib/application/decorators/auth-user.decorator';
import {
  PaginatedQueryBase,
  PaginatedQueryPayloadBase,
  PaginatedQueryResultBase,
} from '#/be/lib/ddd/query.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

import { Notification } from '../../domain/notification.entity';

class Payload extends PaginatedQueryPayloadBase {
  readonly loggedUser: UserPayload;
}

export class ListUserNotificationsQuery extends PaginatedQueryBase<
  Payload,
  Result<PaginatedQueryResultBase<Notification>, ExceptionBase>
> {}
