import { Command } from '@nestjs-architects/typed-cqrs';
import { v4 } from 'uuid';

export class CommandBase<P, R> extends Command<R> {
  public readonly commandId: string;

  constructor(public readonly payload: P) {
    super();
    this.commandId = v4();
  }
}
