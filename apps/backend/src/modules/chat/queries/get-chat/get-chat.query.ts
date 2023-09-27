import { Result } from 'neverthrow';

import { QueryBase } from '#/be/lib/ddd/query.base';
import { Chat } from '../../domain/chat.entity';
import { ChatNotFoundError } from '../../domain/errors/chat-not-found.error';

class Payload {
  readonly id: string;
}

export class GetChatQuery extends QueryBase<
  Payload,
  Result<Chat, ChatNotFoundError>
> {}
