import { ChatMessage } from '@/domain';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { ChatModel } from './chat.model';

@Entity()
export class ChatMessageModel extends BaseModel implements ChatMessage {
  @ManyToOne(() => ChatModel, (chat) => chat.messages)
  chat: ChatModel;

  @ManyToOne(() => UserModel)
  sender: UserModel;

  @Column()
  content: string;

  @Column()
  timestamp: Date;
}
