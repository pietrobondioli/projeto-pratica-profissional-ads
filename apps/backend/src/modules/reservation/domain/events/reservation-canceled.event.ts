import { DomainEventBase } from '#/be/lib/ddd/domain-event.base';

type Payload = {
  readonly reservationId: string;
};

export class ReservationCanceledEvent extends DomainEventBase<Payload> {
  public readonly eventName = 'reservation-canceled';
}
