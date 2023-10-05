import { DomainEventBase } from '#/be/lib/ddd/domain-event.base';

type Payload = {
  readonly reservationId: string;
  readonly byUserId: string;
};

export class ReservationCanceledEvent extends DomainEventBase<Payload> {}
