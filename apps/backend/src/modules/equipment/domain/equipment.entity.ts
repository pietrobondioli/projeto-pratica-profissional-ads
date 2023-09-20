import { AppBaseEntity } from '#/be/lib/ddd/base.entity';

import { Reservation } from '#/be/modules/reservation/domain/reservation.entity';
import { User } from '#/be/modules/user/domain/user.entity';

export class Equipment extends AppBaseEntity {
  description: string;

  photo: string;

  pricePerDay: number;

  availabilityStatus: boolean;

  owner: User;

  reservations: Reservation[];
}
