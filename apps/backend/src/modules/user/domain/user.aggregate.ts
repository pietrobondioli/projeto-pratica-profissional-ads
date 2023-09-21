import { AggregateBase } from '#/be/lib/ddd/aggregate.base';

import { ChangeEmailToken } from './change-email-token.entity';
import { ChangePasswordToken } from './change-password-token.entity';
import { EmailVerificationToken } from './email-verification-token.entity';
import { UserChangedEmail } from './events/user-changed-email.event';
import { UserChangedPassword } from './events/user-changed-password.event';
import { UserConfirmedEmail } from './events/user-confirmed-email.event';
import { UserCreatedEvent } from './events/user-created.event';
import { UserRequestedEmailChange } from './events/user-requested-email-change.event';
import { UserRequestedEmailConfirmationToken } from './events/user-requested-email-confirmation-token.event';
import { UserRequestedPasswordChange } from './events/user-requested-password-change.event';
import { User } from './user.entity';

export class UserAggregate extends AggregateBase {
  private static _user: User;

  static user(user: User) {
    this._user = user;

    return this;
  }

  static created() {
    this.addDomainEvent(new UserCreatedEvent(this._user));
  }

  static requestedEmailChange(token: ChangeEmailToken) {
    this.addDomainEvent(
      new UserRequestedEmailChange({ user: this._user, token }),
    );
  }

  static changedEmail(token: ChangeEmailToken) {
    this.addDomainEvent(new UserChangedEmail({ user: this._user, token }));
  }

  static requestedPasswordChange(token: ChangePasswordToken) {
    this.addDomainEvent(
      new UserRequestedPasswordChange({ user: this._user, token }),
    );
  }

  static changedPassword(token: ChangePasswordToken) {
    this.addDomainEvent(new UserChangedPassword({ user: this._user, token }));
  }

  static requestedEmailConfirmationResend(token: EmailVerificationToken) {
    this.addDomainEvent(
      new UserRequestedEmailConfirmationToken({ user: this._user, token }),
    );
  }

  static confirmedEmail(token: EmailVerificationToken) {
    this.addDomainEvent(new UserConfirmedEmail({ user: this._user, token }));
  }
}
