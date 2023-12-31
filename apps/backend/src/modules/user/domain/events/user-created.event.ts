import { DomainEventBase } from '#/be/lib/ddd/domain-event.base';

type Payload = {
  readonly userId: string;
};

export class UserCreatedEvent extends DomainEventBase<Payload> {
  public readonly eventName = 'user-created';
}
