import { AggregateBase } from '#/be/lib/ddd/aggregate.base';

import { ChangeEmailToken } from './change-email-token.entity';
import { ChangePasswordToken } from './change-password-token.entity';
import { EmailVerificationToken } from './email-verification-token.entity';
import { UpdatedProfileEvent } from './events/updated-profile.event';
import { UserChangedEmailEvent } from './events/user-changed-email.event';
import { UserChangedPasswordEvent } from './events/user-changed-password.event';
import { UserConfirmedEmailEvent } from './events/user-confirmed-email.event';
import { UserCreatedEvent } from './events/user-created.event';
import { UserRequestedEmailChangeEvent } from './events/user-requested-email-change.event';
import { UserRequestedEmailConfirmationTokenEvent } from './events/user-requested-email-confirmation-token.event';
import { UserRequestedPasswordChangeEvent } from './events/user-requested-password-change.event';

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
      new UserRequestedEmailChangeEvent({ userId: this._userId, token }),
    );
  }

  static changedEmail(token: ChangeEmailToken) {
    this.addDomainEvent(
      new UserChangedEmailEvent({ userId: this._userId, token }),
    );
  }

  static requestedPasswordChange(token: ChangePasswordToken) {
    this.addDomainEvent(
      new UserRequestedPasswordChangeEvent({ userId: this._userId, token }),
    );
  }

  static changedPassword(token: ChangePasswordToken) {
    this.addDomainEvent(
      new UserChangedPasswordEvent({ userId: this._userId, token }),
    );
  }

  static requestedEmailConfirmationResend(token: EmailVerificationToken) {
    this.addDomainEvent(
      new UserRequestedEmailConfirmationTokenEvent({
        userId: this._userId,
        token,
      }),
    );
  }

  static confirmedEmail(token: EmailVerificationToken) {
    this.addDomainEvent(
      new UserConfirmedEmailEvent({ userId: this._userId, token }),
    );
  }

  static updatedProfile() {
    this.addDomainEvent(new UpdatedProfileEvent({ userId: this._userId }));
  }
}
