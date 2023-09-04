import { EmailVerificationToken, User } from '@/domain';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseModel } from './base.model';
import { UserProfileModel } from './user-profile.model';
import { EquipmentModel } from './equipment.model';
import { ReservationModel } from './reservation.model';
import { FeedbackModel } from './feedback.model';
import { NotificationModel } from './notification.model';
import { ChangeEmailTokenModel } from './change-email-token.model';
import { ChangePasswordTokenModel } from './change-password-token.model';

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

  @OneToMany(() => EmailVerificationToken, (notification) => notification.user)
  emailVerificationTokens: EmailVerificationToken[];
}
