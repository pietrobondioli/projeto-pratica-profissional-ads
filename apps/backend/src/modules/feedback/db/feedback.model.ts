import { Column, Entity, ManyToOne, Repository } from 'typeorm';

import { BaseModel } from '#/be/lib/db/base.model';
import { ReservationModel } from '#/be/modules/reservation/db/reservation.model';
import { UserModel } from '#/be/modules/user/db/user.model';

import { Feedback } from '../domain/feedback.entity';

@Entity({
  name: 'feedback',
})
export class FeedbackModel extends BaseModel implements Feedback {
  @ManyToOne(() => UserModel)
  fromUser: UserModel;

  @ManyToOne(() => ReservationModel, (reservation) => reservation.feedbacks)
  reservation: ReservationModel;

  @Column()
  rating: number;

  @Column()
  comment: string;
}

export type FeedbackRepo = Repository<FeedbackModel>;
