import { DomainEventBase } from '#/be/lib/ddd/domain-event.base';

import { EmailVerificationToken } from '../email-verification-token.entity';
import { User } from '../user.entity';

type Payload = {
  user: User;
  token: EmailVerificationToken;
};

export class UserConfirmedEmail extends DomainEventBase<Payload> {}
