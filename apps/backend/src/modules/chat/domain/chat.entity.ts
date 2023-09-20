import { AppEntityBase } from '#/be/lib/ddd/entity.base';
import { ChatMessage } from '#/be/modules/chat/domain/chat-message.entity';
import { User } from '#/be/modules/user/domain/user.entity';

export class Chat extends AppEntityBase {
  user1: User;

  user2: User;

  lastUpdated: Date;

  messages: ChatMessage[];
}
