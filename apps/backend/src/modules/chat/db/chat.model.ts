import { Entity, ManyToOne, OneToMany, Repository } from 'typeorm';

import { BaseModel } from '#/be/lib/db/base.model';
import { ChatMessageModel } from '#/be/modules/chat/db/chat-message.model';
import { UserModel } from '#/be/modules/user/db/user.model';

import { Chat } from '../domain/chat.entity';

@Entity({
  name: 'chat',
})
export class ChatModel extends BaseModel implements Chat {
  @ManyToOne(() => UserModel)
  user1: UserModel;

  @ManyToOne(() => UserModel)
  user2: UserModel;

  @OneToMany(() => ChatMessageModel, (chatMessage) => chatMessage.chat)
  messages: ChatMessageModel[];
}

export type ChatRepo = Repository<ChatModel>;
