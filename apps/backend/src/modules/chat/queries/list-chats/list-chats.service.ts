import { QueryResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok } from 'neverthrow';
import { Like } from 'typeorm';

import { CHAT_REPO } from '../../chat.di-tokens';

import { ChatRepo } from '../../db/chat.model';
import { ListChatsQuery } from './list-chats.query';

@QueryHandler(ListChatsQuery)
export class ListChatsQueryHandler
  implements IInferredQueryHandler<ListChatsQuery>
{
  constructor(
    @Inject(CHAT_REPO)
    private readonly chatRepo: ChatRepo,
  ) {}

  async execute(query: ListChatsQuery): Promise<QueryResult<ListChatsQuery>> {
    const { loggedUser, targetUserSearch, page, limit, order } = query.payload;

    const items = await this.chatRepo.find({
      where: [
        {
          user1: { id: loggedUser.id },
          user2: {
            userProfile: [
              {
                ...(targetUserSearch && {
                  firstName: Like(`%${targetUserSearch}%`),
                }),
              },
              {
                ...(targetUserSearch && {
                  lastName: Like(`%${targetUserSearch}%`),
                }),
              },
            ],
          },
        },
        {
          user2: { id: loggedUser.id },
          user1: {
            userProfile: [
              {
                ...(targetUserSearch && {
                  firstName: Like(`%${targetUserSearch}%`),
                }),
              },
              {
                ...(targetUserSearch && {
                  lastName: Like(`%${targetUserSearch}%`),
                }),
              },
            ],
          },
        },
      ],
      skip: Math.max(0, (page - 1) * limit),
      take: limit,
      order: {
        [order.field]: order.param,
      },
      relations: ['user1', 'user2', 'messages'],
    });

    return new Ok({
      items: items,
      page,
      limit,
      total: items.length,
    });
  }
}
