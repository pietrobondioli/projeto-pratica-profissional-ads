import { QueryResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'neverthrow';
import { UserRepo } from '../../db/user.model';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { USER_REPO } from '../../user.di-tokens';
import { GetMeQuery } from './get-me.query';

@QueryHandler(GetMeQuery)
export class GetMeQueryHandler implements IInferredQueryHandler<GetMeQuery> {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
  ) {}

  async execute(query: GetMeQuery): Promise<QueryResult<GetMeQuery>> {
    const { loggedUser } = query.payload;

    const user = await this.userRepo.findOne({
      where: {
        id: loggedUser.id,
      },
      relations: ['userProfile', 'userProfile.profilePicture'],
    });

    if (!user) {
      return new Err(new UserNotFoundError());
    }

    return new Ok(user);
  }
}
