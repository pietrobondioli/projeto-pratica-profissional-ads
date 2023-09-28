import { DomainEventBase } from '#/be/lib/ddd/domain-event.base';

import { ChatMessage } from '../chat-message.entity';
import { Chat } from '../chat.entity';

type Payload = {
  readonly chat: Chat;
  readonly message: ChatMessage;
};

export class MessageSentEvent extends DomainEventBase<Payload> {
  public readonly eventName = 'message-sent';
}
