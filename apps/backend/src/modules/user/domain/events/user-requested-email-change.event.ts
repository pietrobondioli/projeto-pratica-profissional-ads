import { DomainEventBase } from '#/be/lib/ddd/domain-event.base';

import { ChangeEmailToken } from '../change-email-token.entity';

type Payload = {
  userId: string;
  token: ChangeEmailToken;
};

export class UserRequestedEmailChange extends DomainEventBase<Payload> {
  public readonly eventName = 'user-requested-email-change';
}
