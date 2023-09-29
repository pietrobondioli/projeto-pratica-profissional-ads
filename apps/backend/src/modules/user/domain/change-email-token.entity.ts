import { AppEntityBase } from '#/be/lib/ddd/entity.base';
import { User } from '#/be/modules/user/domain/user.entity';

export class ChangeEmailToken extends AppEntityBase {
  user: User;

  oldEmail: string;

  newEmail: string;

  token: string;

  expiresAt: Date;

  consumedAt?: Date;

  invalidatedAt?: Date;

  consumerIp?: string;
}
