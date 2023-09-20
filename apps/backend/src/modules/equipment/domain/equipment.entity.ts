import { AppEntityBase } from '#/be/lib/ddd/entity.base';

import { Reservation } from '#/be/modules/reservation/domain/reservation.entity';
import { User } from '#/be/modules/user/domain/user.entity';

export class Equipment extends AppEntityBase {
  description: string;

  photo: string;

  pricePerDay: number;

  availabilityStatus: boolean;

  owner: User;

  reservations: Reservation[];
}
