import { ReqContextProvider } from '#/be/lib/application/request/req.context';
import { UserRepo } from '#/be/modules/user/db/user.model';
import { USER_REPO } from '#/be/modules/user/user.di-tokens';
import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok } from 'neverthrow';
import { CHAT_MESSAGE_REPO, CHAT_REPO } from '../../chat.di-tokens';
import { ChatMessageRepo } from '../../db/chat-message.model';
import { ChatRepo } from '../../db/chat.model';
import { ChatMessage } from '../../domain/chat-message.entity';
import { ChatAggregate } from '../../domain/chat.aggregate';
import { ChatNotFoundError } from '../../domain/errors/chat-not-found.error';
import { SendMessageCommand } from './send-message.command';

@CommandHandler(SendMessageCommand)
export class SendMessageCommandHandler
  implements IInferredCommandHandler<SendMessageCommand>
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
    command: SendMessageCommand,
  ): Promise<CommandResult<SendMessageCommand>> {
    try {
      const { chatId, message } = command.payload;

      const authUser = ReqContextProvider.getAuthUser();

      const user = await this.userRepo.findOneBy({
        id: authUser.id,
      });

      const chat = await this.chatRepo.findOneBy({
        id: chatId,
      });

      if (!chat) {
        return new Err(new ChatNotFoundError());
      }

      const chatMessage = new ChatMessage();
      chatMessage.chat = chat;
      chatMessage.sender = user;
      chatMessage.content = message;

      const createdChatMessage = await this.chatMessageRepo.save(chatMessage);

      ChatAggregate.chat(chat).messageSent(chatMessage);

      ChatAggregate.publishEvents(this.eventEmitter);

      return new Ok(createdChatMessage.id);
    } finally {
      ChatAggregate.clearEvents();
    }
  }
}
