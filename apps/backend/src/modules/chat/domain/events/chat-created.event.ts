import { DomainEventBase } from '#/be/lib/ddd/domain-event.base';

import { Chat } from '../chat.entity';

type Payload = {
  readonly chat: Chat;
};

export class ChatCreatedEvent extends DomainEventBase<Payload> {}
