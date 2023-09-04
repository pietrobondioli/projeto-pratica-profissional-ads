import { PaymentStatus, Reservation } from '@/domain';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { FeedbackModel } from './feedback.model';
import { PaymentModel } from './payment.model';
import { EquipmentModel } from './equipment.model';

@Entity()
export class ReservationModel extends BaseModel implements Reservation {
  @ManyToOne(() => EquipmentModel, (equipment) => equipment.reservations)
  equipment: EquipmentModel;

  @ManyToOne(() => UserModel, (user) => user.reservations)
  renter: UserModel;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  totalPrice: number;

  @Column({ type: 'enum', enum: PaymentStatus })
  paymentStatus: PaymentStatus;

  @OneToMany(() => FeedbackModel, (feedback) => feedback.reservation)
  feedbacks: FeedbackModel[];

  @ManyToOne(() => PaymentModel, (payment) => payment.reservation)
  payment: PaymentModel;
}
