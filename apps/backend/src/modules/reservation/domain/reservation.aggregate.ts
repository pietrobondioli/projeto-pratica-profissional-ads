import { AggregateBase } from '#/be/lib/ddd/aggregate.base';

import { ReservationCanceledEvent } from './events/reservation-canceled.event';
import { ReservationCreatedEvent } from './events/reservation-created.event';

export class ReservationAggregate extends AggregateBase {
  private static _reservationId: string;

  static entityID(reservationId: string) {
    this._reservationId = reservationId;

    return this;
  }

  static created() {
    this.addDomainEvent(
      new ReservationCreatedEvent({
        reservationId: this._reservationId,
      }),
    );
  }

  static canceled() {
    this.addDomainEvent(
      new ReservationCanceledEvent({
        reservationId: this._reservationId,
      }),
    );
  }
}
