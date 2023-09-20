import { AppBaseEntity } from '#/be/lib/ddd/base.entity';
import { Reservation } from '#/be/modules/reservation/domain/reservation.entity';
import { User } from '#/be/modules/user/domain/user.entity';

export class Feedback extends AppBaseEntity {
  fromUser: User;

  toUser: User;

  reservation: Reservation;

  rating: number;

  comment: string;
}
