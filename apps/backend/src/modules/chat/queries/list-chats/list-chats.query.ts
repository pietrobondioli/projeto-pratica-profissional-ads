import { Result } from 'neverthrow';

import {
  PaginatedQueryBase,
  PaginatedQueryPayloadBase,
  PaginatedQueryResultBase,
} from '#/be/lib/ddd/query.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

import { UserPayload } from '#/be/lib/application/decorators/auth-user.decorator';
import { Chat } from '../../domain/chat.entity';

class Payload extends PaginatedQueryPayloadBase {
  readonly targetUserSearch: string;
  readonly loggedUser: UserPayload;
}

export class ListChatsQuery extends PaginatedQueryBase<
  Payload,
  Result<PaginatedQueryResultBase<Chat>, ExceptionBase>
> {}
