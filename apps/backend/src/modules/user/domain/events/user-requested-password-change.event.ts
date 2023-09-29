import { DomainEventBase } from '#/be/lib/ddd/domain-event.base';

import { ChangePasswordToken } from '../change-password-token.entity';

type Payload = {
  userId: string;
  token: ChangePasswordToken;
};

export class UserRequestedPasswordChangeEvent extends DomainEventBase<Payload> {
  public readonly eventName = 'user-requested-password-change';
}
