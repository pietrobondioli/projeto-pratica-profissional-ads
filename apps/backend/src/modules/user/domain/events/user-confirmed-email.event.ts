import { DomainEventBase } from '#/be/lib/ddd/domain-event.base';

import { EmailVerificationToken } from '../email-verification-token.entity';

type Payload = {
  userId: string;
  token: EmailVerificationToken;
};

export class UserConfirmedEmail extends DomainEventBase<Payload> {
  public readonly eventName = 'user-confirmed-email';
}
