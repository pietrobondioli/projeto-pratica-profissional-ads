import { QueryResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'neverthrow';

import { CHAT_REPO } from '../../chat.di-tokens';
import { ChatNotFoundError } from '../../domain/errors/chat-not-found.error';

import { ChatRepo } from '../../db/chat.model';
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
    const chat = await this.chatRepo.findOneBy({
      id: query.payload.id,
    });

    if (!chat) {
      return new Err(new ChatNotFoundError());
    }

    return new Ok(chat);
  }
}
