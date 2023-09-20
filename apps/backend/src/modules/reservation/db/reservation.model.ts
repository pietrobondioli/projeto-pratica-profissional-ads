import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseModel } from '#/be/lib/db/base.model';
import { EquipmentModel } from '#/be/modules/equipment/db/equipment.model';
import { FeedbackModel } from '#/be/modules/feedback/db/feedback.model';
import { PaymentModel } from '#/be/modules/payment/db/payment.model';
import { UserModel } from '#/be/modules/user/db/user.model';

import { PaymentStatus, Reservation } from '../domain/reservation.entity';

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
