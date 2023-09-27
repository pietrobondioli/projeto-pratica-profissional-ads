import { ReqContextProvider } from '#/be/lib/application/request/req.context';
import { QueryResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok } from 'neverthrow';
import { Like, Repository } from 'typeorm';
import { CHAT_REPO } from '../../chat.di-tokens';
import { Chat } from '../../domain/chat.entity';
import { ListChatsQuery } from './list-chats.query';

@QueryHandler(ListChatsQuery)
export class ListChatsQueryHandler
  implements IInferredQueryHandler<ListChatsQuery>
{
  constructor(
    @Inject(CHAT_REPO)
    private readonly ChatRepo: Repository<Chat>,
  ) {}

  async execute(query: ListChatsQuery): Promise<QueryResult<ListChatsQuery>> {
    const { targetUserSearch, page, limit, order } = query.payload;

    const loggedUser = ReqContextProvider.getAuthUser();

    const items = await this.ChatRepo.find({
      where: [
        {
          user1: { id: loggedUser.id },
          user2: {
            userProfile: [
              {
                firstName: Like(`%${targetUserSearch}%`),
              },
              {
                lastName: Like(`%${targetUserSearch}%`),
              },
            ],
          },
        },
        {
          user2: { id: loggedUser.id },
          user1: {
            userProfile: [
              {
                firstName: Like(`%${targetUserSearch}%`),
              },
              {
                lastName: Like(`%${targetUserSearch}%`),
              },
            ],
          },
        },
      ],
      skip: (page - 1) * limit,
      take: limit,
      order: {
        [order.field === true ? 'createdAt' : order.field]: order.param,
      },
    });

    return new Ok({
      items: items,
      page,
      limit,
      total: items.length,
    });
  }
}
