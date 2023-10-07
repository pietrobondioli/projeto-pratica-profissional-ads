import { AggregateBase } from '#/be/lib/ddd/aggregate.base';

export class PaymentAggregate extends AggregateBase {
  private static _paymentId: string;

  static entityID(paymentId: string) {
    this._paymentId = paymentId;

    return this;
  }
}
