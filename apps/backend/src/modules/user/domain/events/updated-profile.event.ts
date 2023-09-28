import { DomainEventBase } from '#/be/lib/ddd/domain-event.base';

type Payload = {
  readonly userId: string;
};

export class UpdatedProfileEvent extends DomainEventBase<Payload> {
  public readonly eventName = 'updated-profile';
}
