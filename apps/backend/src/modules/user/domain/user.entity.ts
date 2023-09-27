import { AppEntityBase } from '#/be/lib/ddd/entity.base';
import { Equipment } from '#/be/modules/equipment/domain/equipment.entity';
import { Feedback } from '#/be/modules/feedback/domain/feedback.entity';
import { Notification } from '#/be/modules/notification/domain/notification.entity';
import { Reservation } from '#/be/modules/reservation/domain/reservation.entity';
import { ChangeEmailToken } from '#/be/modules/user/domain/change-email-token.entity';
import { ChangePasswordToken } from '#/be/modules/user/domain/change-password-token.entity';
import { EmailVerificationToken } from '#/be/modules/user/domain/email-verification-token.entity';
import { UserProfile } from '#/be/modules/user/domain/user-profile.entity';

export class User extends AppEntityBase {
  email: string;

  passwordHash: string;

  userProfile: UserProfile;

  equipment: Equipment[];

  reservations: Reservation[];

  givenFeedbacks: Feedback[];

  notifications: Notification[];

  changeEmailTokens: ChangeEmailToken[];

  changePasswordTokens: ChangePasswordToken[];

  emailVerificationTokens: EmailVerificationToken[];
}
