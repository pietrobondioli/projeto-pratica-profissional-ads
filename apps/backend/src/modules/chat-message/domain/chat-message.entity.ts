import { AppBaseEntity } from '#/be/lib/ddd/base.entity';
import { Chat } from '#/be/modules/chat/domain/chat.entity';
import { User } from '#/be/modules/user/domain/user.entity';

export class ChatMessage extends AppBaseEntity {
  chat: Chat;

  sender: User;

  content: string;

  timestamp: Date;
}
