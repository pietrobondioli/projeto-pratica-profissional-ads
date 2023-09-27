import { v4 } from 'uuid';

export abstract class DomainEventBase<T> {
  public readonly id: string;
  public abstract readonly eventName: string;

  constructor(public readonly payload: T) {
    this.id = v4();
  }
}
