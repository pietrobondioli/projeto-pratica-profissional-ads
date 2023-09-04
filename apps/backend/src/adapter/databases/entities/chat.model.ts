import { Chat } from '@/domain';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { ChatMessageModel } from './chat-message.model';

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
