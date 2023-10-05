import { DomainEventBase } from '#/be/lib/ddd/domain-event.base';

type Payload = {
  readonly equipmentId: string;
  readonly userId: string;
};

export class EquipmentCreatedEvent extends DomainEventBase<Payload> {}
