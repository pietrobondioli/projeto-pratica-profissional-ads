import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { CHAT_MESSAGE_REPO, CHAT_REPO } from './chat.di-tokens';
import { CreateChatHttpController } from './commands/create-chat/create-chat.http.controller';
import { CreateChatCommandHandler } from './commands/create-chat/create-chat.service';
import { SendMessageHttpController } from './commands/send-message/send-message.http.controller';
import { SendMessageCommandHandler } from './commands/send-message/send-message.service';
import { ChatMessageModel } from './db/chat-message.model';
import { ChatModel } from './db/chat.model';
import { GetChatHttpController } from './queries/get-chat/get-chat.http.controller';
import { GetChatQueryHandler } from './queries/get-chat/get-chat.service';
import { ListChatsHttpController } from './queries/list-chats/list-chats.http.controller';
import { ListChatsQueryHandler } from './queries/list-chats/list-chats.service';

const commandHandlers: Provider[] = [
  CreateChatCommandHandler,
  SendMessageCommandHandler,
];

const queryHandlers: Provider[] = [GetChatQueryHandler, ListChatsQueryHandler];

const mappers: Provider[] = [];

const repositories: Provider[] = [
  {
    provide: CHAT_REPO,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ChatModel),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: CHAT_MESSAGE_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ChatMessageModel),
    inject: ['DATA_SOURCE'],
  },
];

@Module({
  imports: [CqrsModule],
  controllers: [
    CreateChatHttpController,
    SendMessageHttpController,
    GetChatHttpController,
    ListChatsHttpController,
  ],
  providers: [
    Logger,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
  ],
  exports: [...repositories],
})
export class ChatModule {}
