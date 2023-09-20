import { AppBaseEntity } from '#/be/lib/ddd/base.entity';
import { User } from '#/be/modules/user/domain/user.entity';

export class ChangePasswordToken extends AppBaseEntity {
  user: User;

  token: string;

  expiresAt: Date;

  consumedAt?: Date;

  invalidatedAt?: Date;

  consumerIp?: string;
}
