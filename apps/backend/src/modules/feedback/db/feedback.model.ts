import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from '#/be/lib/db/base.model';

import { Feedback } from '../domain/feedback.entity';

import { ReservationModel } from '#/be/modules/reservation/db/reservation.model';
import { UserModel } from '#/be/modules/user/db/user.model';

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
