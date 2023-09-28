import { Column, Entity, ManyToOne, Repository } from 'typeorm';

import { BaseModel } from '#/be/lib/db/base.model';
import { ChatModel } from '#/be/modules/chat/db/chat.model';
import { UserModel } from '#/be/modules/user/db/user.model';

import { ChatMessage } from '../domain/chat-message.entity';

@Entity({
  name: 'chat_message',
})
export class ChatMessageModel extends BaseModel implements ChatMessage {
  @ManyToOne(() => ChatModel, (chat) => chat.messages)
  chat: ChatModel;

  @ManyToOne(() => UserModel)
  sender: UserModel;

  @Column()
  content: string;
}

export type ChatMessageRepo = Repository<ChatMessageModel>;
