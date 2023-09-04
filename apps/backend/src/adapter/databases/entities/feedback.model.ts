import { Feedback } from '@/domain';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { ReservationModel } from './reservation.model';

@Entity()
export class FeedbackModel extends BaseModel implements Feedback {
  @ManyToOne(() => UserModel)
  fromUser: UserModel;

  @ManyToOne(() => UserModel)
  toUser: UserModel;

  @ManyToOne(() => ReservationModel, (reservation) => reservation.feedbacks)
  reservation: ReservationModel;

  @Column()
  rating: number;

  @Column()
  comment: string;
}
