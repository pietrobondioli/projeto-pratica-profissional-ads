import { ReqContextProvider } from '#/be/lib/application/request/req.context';
import { USER_REPO } from '#/be/modules/user/user.di-tokens';
import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok } from 'neverthrow';
import { CHAT_MESSAGE_REPO, CHAT_REPO } from '../../chat.di-tokens';
import { ChatMessage } from '../../domain/chat-message.entity';
import { ChatAggregate } from '../../domain/chat.aggregate';
import { Chat } from '../../domain/chat.entity';
import { TargetUserNotFoundError } from '../../domain/errors/target-user-not-found.error';
import { CreateChatCommand } from './create-chat.command';
import { UserRepo } from '#/be/modules/user/db/user.model';
import { ChatRepo } from '../../db/chat.model';
import { ChatMessageRepo } from '../../db/chat-message.model';

@CommandHandler(CreateChatCommand)
export class CreateChatCommandHandler
  implements IInferredCommandHandler<CreateChatCommand>
{
  constructor(
    @Inject(USER_REPO)
    protected readonly userRepo: UserRepo,
    @Inject(CHAT_REPO)
    protected readonly chatRepo: ChatRepo,
    @Inject(CHAT_MESSAGE_REPO)
    protected readonly chatMessageRepo: ChatMessageRepo,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: CreateChatCommand,
  ): Promise<CommandResult<CreateChatCommand>> {
    try {
      const { withUserId, message } = command.payload;

      const authUser = ReqContextProvider.getAuthUser();

      const user1 = await this.userRepo.findOneBy({
        id: authUser.id,
      });

      const user2 = await this.userRepo.findOneBy({
        id: withUserId,
      });

      if (!user1 || !user2) {
        return new Err(new TargetUserNotFoundError());
      }

      const chat = new Chat(authUser.id);
      chat.user1 = user1;
      chat.user2 = user2;

      const createdChat = await this.chatRepo.save(chat);

      ChatAggregate.chat(createdChat).created();

      const chatMessage = new ChatMessage(authUser.id);
      chatMessage.chat = createdChat;
      chatMessage.sender = user1;
      chatMessage.content = message;

      const createdChatMessage = await this.chatMessageRepo.save(chatMessage);

      ChatAggregate.chat(createdChat).messageSent(createdChatMessage);

      ChatAggregate.publishEvents(this.eventEmitter);

      return new Ok(createdChat.id);
    } finally {
      ChatAggregate.clearEvents();
    }
  }
}
