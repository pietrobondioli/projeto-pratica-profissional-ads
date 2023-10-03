import { QueryResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'neverthrow';

import { CHAT_REPO } from '../../chat.di-tokens';
import { ChatRepo } from '../../db/chat.model';
import { ChatNotFoundError } from '../../domain/errors/chat-not-found.error';

import { GetChatQuery } from './get-chat.query';

@QueryHandler(GetChatQuery)
export class GetChatQueryHandler
  implements IInferredQueryHandler<GetChatQuery>
{
  constructor(
    @Inject(CHAT_REPO)
    private readonly chatRepo: ChatRepo,
  ) {}

  async execute(query: GetChatQuery): Promise<QueryResult<GetChatQuery>> {
    const { chatId } = query.payload;

    const chat = await this.chatRepo.findOne({
      where: {
        id: chatId,
      },
      relations: [
        'user1',
        'user1.userProfile',
        'user2',
        'user2.userProfile',
        'messages',
        'messages.sender',
        'messages.sender.userProfile',
      ],
    });

    console.log(chat);

    if (!chat) {
      return new Err(new ChatNotFoundError());
    }

    return new Ok(chat);
  }
}
