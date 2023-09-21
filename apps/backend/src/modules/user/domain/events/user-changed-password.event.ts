import { DomainEventBase } from '#/be/lib/ddd/domain-event.base';

import { ChangePasswordToken } from '../change-password-token.entity';
import { User } from '../user.entity';

type Payload = {
  user: User;
  token: ChangePasswordToken;
};

export class UserChangedPassword extends DomainEventBase<Payload> {}
