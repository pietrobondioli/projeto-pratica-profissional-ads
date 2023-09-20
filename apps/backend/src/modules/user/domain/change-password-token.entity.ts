import { AppEntityBase } from '#/be/lib/ddd/entity.base';
import { User } from '#/be/modules/user/domain/user.entity';

export class ChangePasswordToken extends AppEntityBase {
  user: User;

  token: string;

  expiresAt: Date;

  consumedAt?: Date;

  invalidatedAt?: Date;

  consumerIp?: string;
}
