import { AggregateBase } from '#/be/lib/ddd/aggregate.base';

import { ChangeEmailToken } from './change-email-token.entity';
import { ChangePasswordToken } from './change-password-token.entity';
import { EmailVerificationToken } from './email-verification-token.entity';
import { UpdatedProfileEvent } from './events/updated-profile.event';
import { UserChangedEmail } from './events/user-changed-email.event';
import { UserChangedPassword } from './events/user-changed-password.event';
import { UserConfirmedEmail } from './events/user-confirmed-email.event';
import { UserCreatedEvent } from './events/user-created.event';
import { UserRequestedEmailChange } from './events/user-requested-email-change.event';
import { UserRequestedEmailConfirmationToken } from './events/user-requested-email-confirmation-token.event';
import { UserRequestedPasswordChange } from './events/user-requested-password-change.event';

export class UserAggregate extends AggregateBase {
  private static _userId: string;

  static user(userId: string) {
    this._userId = userId;

    return this;
  }

  static created() {
    this.addDomainEvent(new UserCreatedEvent({ userId: this._userId }));
  }

  static requestedEmailChange(token: ChangeEmailToken) {
    this.addDomainEvent(
      new UserRequestedEmailChange({ userId: this._userId, token }),
    );
  }

  static changedEmail(token: ChangeEmailToken) {
    this.addDomainEvent(new UserChangedEmail({ userId: this._userId, token }));
  }

  static requestedPasswordChange(token: ChangePasswordToken) {
    this.addDomainEvent(
      new UserRequestedPasswordChange({ userId: this._userId, token }),
    );
  }

  static changedPassword(token: ChangePasswordToken) {
    this.addDomainEvent(
      new UserChangedPassword({ userId: this._userId, token }),
    );
  }

  static requestedEmailConfirmationResend(token: EmailVerificationToken) {
    this.addDomainEvent(
      new UserRequestedEmailConfirmationToken({ userId: this._userId, token }),
    );
  }

  static confirmedEmail(token: EmailVerificationToken) {
    this.addDomainEvent(
      new UserConfirmedEmail({ userId: this._userId, token }),
    );
  }

  static updatedProfile() {
    this.addDomainEvent(new UpdatedProfileEvent({ userId: this._userId }));
  }
}
