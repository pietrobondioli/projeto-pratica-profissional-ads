import { AggregateBase } from '#/be/lib/ddd/aggregate.base';

export class NotificationAggregate extends AggregateBase {
  private static _notificationId: string;

  static entityID(notificationId: string) {
    this._notificationId = notificationId;

    return this;
  }
}
