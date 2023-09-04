import { Notification, NotificationStatus } from '@/domain';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.model';
import { UserModel } from './user.model';

@Entity()
export class NotificationModel extends BaseModel implements Notification {
  @ManyToOne(() => UserModel, (user) => user.notifications)
  user: UserModel;

  @Column()
  message: string;

  @Column({ type: 'enum', enum: NotificationStatus })
  status: NotificationStatus;
}
