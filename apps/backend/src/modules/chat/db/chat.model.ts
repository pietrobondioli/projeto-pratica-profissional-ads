import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseModel } from '#/be/lib/db/base.model';
import { UserModel } from '#/be/modules/user/db/user.model';
import { ChatMessageModel } from '#/be/modules/chat-message/db/chat-message.model';

import { Chat } from '../domain/chat.entity';

@Entity()
export class ChatModel extends BaseModel implements Chat {
  @ManyToOne(() => UserModel)
  user1: UserModel;

  @ManyToOne(() => UserModel)
  user2: UserModel;

  @Column()
  lastUpdated: Date;

  @OneToMany(() => ChatMessageModel, (chatMessage) => chatMessage.chat)
  messages: ChatMessageModel[];
}
