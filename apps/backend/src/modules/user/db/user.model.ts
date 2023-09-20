import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseModel } from '#/be/lib/db/base.model';
import { ChangeEmailTokenModel } from '#/be/modules/change-email-token/db/change-email-token.model';
import { ChangePasswordTokenModel } from '#/be/modules/change-password-token/db/change-password-token.model';
import { EmailVerificationTokenModel } from '#/be/modules/email-verification-token/db/email-verification-token.model';
import { EquipmentModel } from '#/be/modules/equipment/db/equipment.model';
import { FeedbackModel } from '#/be/modules/feedback/db/feedback.model';
import { NotificationModel } from '#/be/modules/notification/db/notification.model';
import { ReservationModel } from '#/be/modules/reservation/db/reservation.model';
import { UserProfileModel } from '#/be/modules/user-profile/db/user-profile.model';

import { User } from '../domain/user.entity';

@Entity()
export class UserModel extends BaseModel implements User {
  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @OneToOne(() => UserProfileModel, (userProfile) => userProfile.user, {
    cascade: true,
  })
  @JoinColumn()
  userProfile: UserProfileModel;

  @OneToMany(() => EquipmentModel, (equipment) => equipment.owner)
  equipment: EquipmentModel[];

  @OneToMany(() => ReservationModel, (reservation) => reservation.renter)
  reservations: ReservationModel[];

  @OneToMany(() => FeedbackModel, (feedback) => feedback.fromUser)
  givenFeedbacks: FeedbackModel[];

  @OneToMany(() => FeedbackModel, (feedback) => feedback.toUser)
  receivedFeedbacks: FeedbackModel[];

  @OneToMany(() => NotificationModel, (notification) => notification.user)
  notifications: NotificationModel[];

  @OneToMany(() => ChangeEmailTokenModel, (token) => token.user)
  changeEmailTokens: ChangeEmailTokenModel[];

  @OneToMany(() => ChangePasswordTokenModel, (token) => token.user)
  changePasswordTokens: ChangePasswordTokenModel[];

  @OneToMany(
    () => EmailVerificationTokenModel,
    (notification) => notification.user,
  )
  emailVerificationTokens: EmailVerificationTokenModel[];
}
