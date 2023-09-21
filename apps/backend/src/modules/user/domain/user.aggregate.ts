import { AggregateBase } from '#/be/lib/ddd/aggregate.base';
import { ChangeEmailToken } from './change-email-token.entity';
import { ChangePasswordToken } from './change-password-token.entity';
import { EmailVerificationToken } from './email-verification-token.entity';

import { UserCreatedEvent } from './events/user-created.event';
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
    // TODO
  }

  static changedEmail(token: ChangeEmailToken) {
    // TODO
  }

  static requestedPasswordChange(token: ChangePasswordToken) {
    // TODO
  }

  static changedPassword(token: ChangePasswordToken) {
    // TODO
  }

  static requestedEmailConfirmationResend(token: EmailVerificationToken) {
    // TODO
  }

  static confirmedEmail(token: EmailVerificationToken) {
    // TODO
  }
}
