import { AppBaseEntity } from '#/be/lib/ddd/base.entity';
import { ChangeEmailToken } from '#/be/modules/change-email-token/domain/change-email-token.entity';
import { ChangePasswordToken } from '#/be/modules/change-password-token/domain/change-password-token.entity';
import { EmailVerificationToken } from '#/be/modules/email-verification-token/domain/email-verification-token.entity';
import { Equipment } from '#/be/modules/equipment/domain/equipment.entity';
import { Feedback } from '#/be/modules/feedback/domain/feedback.entity';
import { Notification } from '#/be/modules/notification/domain/notification.entity';
import { Reservation } from '#/be/modules/reservation/domain/reservation.entity';
import { UserProfile } from '#/be/modules/user-profile/domain/user-profile.entity';

export class User extends AppBaseEntity {
  email: string;

  passwordHash: string;

  userProfile: UserProfile;

  equipment: Equipment[];

  reservations: Reservation[];

  givenFeedbacks: Feedback[];

  receivedFeedbacks: Feedback[];

  notifications: Notification[];

  changeEmailTokens: ChangeEmailToken[];

  changePasswordTokens: ChangePasswordToken[];

  emailVerificationTokens: EmailVerificationToken[];
}
