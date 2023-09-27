import { QueryResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'neverthrow';
import { UserRepo } from '../../db/user.model';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { USER_REPO } from '../../user.di-tokens';
import { GetUserQuery } from './get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler
  implements IInferredQueryHandler<GetUserQuery>
{
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
  ) {}

  async execute(query: GetUserQuery): Promise<QueryResult<GetUserQuery>> {
    const user = await this.userRepo.findOneBy({
      id: query.payload.id,
    });

    if (!user) {
      return new Err(new UserNotFoundError());
    }

    return new Ok(user);
  }
}
