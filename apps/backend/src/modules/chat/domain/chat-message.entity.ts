import { AppEntityBase } from '#/be/lib/ddd/entity.base';
import { Chat } from '#/be/modules/chat/domain/chat.entity';
import { User } from '#/be/modules/user/domain/user.entity';

export class ChatMessage extends AppEntityBase {
  chat: Chat;

  sender: User;

  content: string;
}
