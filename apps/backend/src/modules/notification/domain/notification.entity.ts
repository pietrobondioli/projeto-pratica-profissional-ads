import { AppBaseEntity } from '#/be/lib/ddd/base.entity';
import { User } from '#/be/modules/user/domain/user.entity';

export enum NotificationStatus {
  READ = 'Read',
  UNREAD = 'Unread',
}

export class Notification extends AppBaseEntity {
  user: User;

  message: string;

  status: NotificationStatus;
}
