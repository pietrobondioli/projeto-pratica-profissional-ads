import { AppEntityBase } from '#/be/lib/ddd/entity.base';
import { User } from '#/be/modules/user/domain/user.entity';

export enum NotificationStatus {
  READ = 'Read',
  UNREAD = 'Unread',
}

export class Notification extends AppEntityBase {
  constructor(createdByUserId?: string) {
    super(createdByUserId);
    this.status = NotificationStatus.UNREAD;
  }

  user: User;

  message: string;

  status: NotificationStatus;
}
