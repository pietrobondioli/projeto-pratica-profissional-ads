import { AppBaseEntity } from '#/be/lib/ddd/base.entity';
import { ChatMessage } from '#/be/modules/chat-message/domain/chat-message.entity';
import { User } from '#/be/modules/user/domain/user.entity';

export class Chat extends AppBaseEntity {
  user1: User;

  user2: User;

  lastUpdated: Date;

  messages: ChatMessage[];
}
