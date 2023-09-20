import { AppEntityBase } from '#/be/lib/ddd/entity.base';
import { Reservation } from '#/be/modules/reservation/domain/reservation.entity';
import { User } from '#/be/modules/user/domain/user.entity';

export class Feedback extends AppEntityBase {
  fromUser: User;

  toUser: User;

  reservation: Reservation;

  rating: number;

  comment: string;
}
