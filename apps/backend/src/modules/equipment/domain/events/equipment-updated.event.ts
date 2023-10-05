import { DomainEventBase } from '#/be/lib/ddd/domain-event.base';

type Payload = {
  readonly equipmentId: string;
  readonly userId: string;
};

export class EquipmentUpdatedEvent extends DomainEventBase<Payload> {}
