import { Result } from 'neverthrow';

import {
  PaginatedQueryBase,
  PaginatedQueryPayloadBase,
  PaginatedQueryResultBase,
} from '#/be/lib/ddd/query.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';
import { Chat } from '../../domain/chat.entity';

class Payload extends PaginatedQueryPayloadBase {
  readonly targetUserSearch: string;
}

export class ListChatsQuery extends PaginatedQueryBase<
  Payload,
  Result<PaginatedQueryResultBase<Chat>, ExceptionBase>
> {}
