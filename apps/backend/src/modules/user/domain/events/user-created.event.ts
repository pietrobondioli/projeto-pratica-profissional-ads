import { DomainEventBase } from '#/be/lib/ddd/domain-event.base';

import { User } from '../user.entity';

export class UserCreatedEvent extends DomainEventBase<User> {
  public readonly eventName = 'user-created';
}
