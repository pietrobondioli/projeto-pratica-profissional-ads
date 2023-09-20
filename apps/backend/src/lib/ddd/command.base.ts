import { v4 } from 'uuid';

export class CommandBase<T> {
  public readonly id: string;

  constructor(public readonly payload: T) {
    this.id = v4();
  }
}
