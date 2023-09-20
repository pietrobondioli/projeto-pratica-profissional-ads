import { v4 } from 'uuid';

export class DomainEventBase<T> {
  public readonly id: string;

  constructor(public readonly payload: T) {
    this.id = v4();
  }
}
