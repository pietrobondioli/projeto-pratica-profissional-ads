import { AppBaseEntity } from '#/be/lib/ddd/base.entity';
import { User } from '#/be/modules/user/domain/user.entity';

export class ChangeEmailToken extends AppBaseEntity {
  user: User;

  newEmail: string;

  token: string;

  expiresAt: Date;

  consumedAt?: Date;

  invalidatedAt?: Date;

  consumerIp?: string;
}
