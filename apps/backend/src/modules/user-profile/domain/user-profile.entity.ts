import { AppBaseEntity } from '#/be/lib/ddd/base.entity';
import { Media } from '#/be/modules/media/domain/media.entity';
import { User } from '#/be/modules/user/domain/user.entity';

export class UserProfile extends AppBaseEntity {
  firstName: string;

  lastName: string;

  contact: string;

  address: string;

  profilePicture?: Media;

  description?: string;

  user: User;
}
