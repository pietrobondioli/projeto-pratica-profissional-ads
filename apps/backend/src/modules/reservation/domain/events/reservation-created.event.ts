import { DomainEventBase } from '#/be/lib/ddd/domain-event.base';

type Payload = {
  readonly reservationId: string;
};

export class ReservationCreatedEvent extends DomainEventBase<Payload> {}
