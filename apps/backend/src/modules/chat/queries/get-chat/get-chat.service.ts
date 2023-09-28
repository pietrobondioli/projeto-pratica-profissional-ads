import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QueryResult } from '@nestjs-architects/typed-cqrs';
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

    const chat = await this.chatRepo.findOneBy({
      id: chatId,
    });

    if (!chat) {
      return new Err(new ChatNotFoundError());
    }

    return new Ok(chat);
  }
}
