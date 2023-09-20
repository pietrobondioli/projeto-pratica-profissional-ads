import { EventEmitter2 } from '@nestjs/event-emitter';

import { DomainEventBase } from './domain-event.base';

export class AggregateBase {
  private static domainEvents: DomainEventBase<unknown>[] = [];

  public static getEvents() {
    return this.domainEvents;
  }

  public static clearEvents() {
    this.domainEvents.splice(0, this.domainEvents.length);
  }

  public static addDomainEvent(event: DomainEventBase<unknown>) {
    this.domainEvents.push(event);
  }

  public static removeDomainEvent(event: DomainEventBase<unknown>) {
    const index = this.domainEvents.findIndex((e) => e === event);
    this.domainEvents.splice(index, 1);
  }

  public static async publishEvents(
    eventEmitter: EventEmitter2,
  ): Promise<void> {
    await Promise.all(
      this.domainEvents.map(async (event) => {
        return eventEmitter.emitAsync(event.constructor.name, event);
      }),
    );
    this.clearEvents();
  }
}
