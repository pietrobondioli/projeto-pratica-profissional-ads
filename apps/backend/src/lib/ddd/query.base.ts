import { Query } from '@nestjs-architects/typed-cqrs';
import { Result } from 'neverthrow';
import { v4 } from 'uuid';

export class QueryBase<P, R extends Result<any, any>> extends Query<R> {
  public readonly queryId: string;

  constructor(public readonly payload: P) {
    super();
    this.queryId = v4();
  }
}

export type OrderBy = { field: string; param: 'asc' | 'desc' };

export abstract class PaginatedQueryPayloadBase {
  readonly page: number;
  readonly limit: number;
  readonly order: OrderBy;
}

export class PaginatedQueryResultBase<T = unknown> {
  readonly items: T[];
  readonly page: number;
  readonly limit: number;
  readonly total: number;
}

export class PaginatedQueryBase<
  P extends PaginatedQueryPayloadBase,
  R extends Result<PaginatedQueryResultBase, any>,
> extends QueryBase<P, R> {}
