import { DomainEventBase } from '#/be/lib/ddd/domain-event.base';

type Payload = {
  readonly equipmentName: string;
  readonly userId: string;
};

export class EquipmentDeletedEvent extends DomainEventBase<Payload> {}
