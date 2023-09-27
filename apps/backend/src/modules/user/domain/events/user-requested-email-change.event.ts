import { DomainEventBase } from '#/be/lib/ddd/domain-event.base';

import { ChangeEmailToken } from '../change-email-token.entity';
import { User } from '../user.entity';

type Payload = {
  user: User;
  token: ChangeEmailToken;
};

export class UserRequestedEmailChange extends DomainEventBase<Payload> {
  public readonly eventName = 'user-requested-email-change';
}
