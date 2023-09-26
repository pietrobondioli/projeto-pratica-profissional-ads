import { AppEntityBase } from '#/be/lib/ddd/entity.base';
import { Reservation } from '#/be/modules/reservation/domain/reservation.entity';
import { User } from '#/be/modules/user/domain/user.entity';

import { Media } from '../../media/domain/media.entity';

export class Equipment extends AppEntityBase {
  title: string;

  description: string;

  photo: Media;

  pricePerDay: number;

  availabilityStatus: boolean;

  owner: User;

  reservations: Reservation[];
}
