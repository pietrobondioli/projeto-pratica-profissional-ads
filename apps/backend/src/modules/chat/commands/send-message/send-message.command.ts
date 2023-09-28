import { Result } from 'neverthrow';

import { CommandBase } from '#/be/lib/ddd/command.base';
import { EntityID } from '#/be/lib/ddd/entity.base';
import { UserNotFoundError } from '#/be/modules/user/domain/errors/user-not-found.error';

import { ChatNotFoundError } from '../../domain/errors/chat-not-found.error';

class Payload {
  readonly chatId: string;
  readonly message: string;
}

export class SendMessageCommand extends CommandBase<
  Payload,
  Result<EntityID, ChatNotFoundError | UserNotFoundError>
> {}
