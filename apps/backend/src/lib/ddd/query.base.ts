import { Query } from '@nestjs-architects/typed-cqrs';
import { v4 } from 'uuid';

export class QueryBase<P, R> extends Query<R> {
  public readonly queryId: string;

  constructor(public readonly payload: P) {
    super();
    this.queryId = v4();
  }
}
