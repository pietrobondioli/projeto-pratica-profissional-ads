import { DomainEventBase } from './domain-event.base';

export class Aggregate<T> {
  private domainEvents: DomainEventBase<T>[] = [];

  public getEvents() {
    return this.domainEvents;
  }

  public clearEvents() {
    this.domainEvents.splice(0, this.domainEvents.length);
  }

  public addDomainEvent(event: DomainEventBase<T>) {
    this.domainEvents.push(event);
  }

  public removeDomainEvent(event: DomainEventBase<T>) {
    const index = this.domainEvents.findIndex((e) => e === event);
    this.domainEvents.splice(index, 1);
  }
}
