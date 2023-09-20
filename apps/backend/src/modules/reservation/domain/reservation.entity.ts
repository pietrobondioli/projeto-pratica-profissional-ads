import { AppBaseEntity } from '#/be/lib/ddd/base.entity';
import { Equipment } from '#/be/modules/equipment/domain/equipment.entity';
import { Feedback } from '#/be/modules/feedback/domain/feedback.entity';
import { Payment } from '#/be/modules/payment/domain/payment.entity';
import { User } from '#/be/modules/user/domain/user.entity';

export enum PaymentStatus {
  PENDING = 'Pending',
  PAID = 'Paid',
  FAILED = 'Failed',
}

export class Reservation extends AppBaseEntity {
  equipment: Equipment;

  renter: User;

  startDate: Date;

  endDate: Date;

  totalPrice: number;

  paymentStatus: PaymentStatus;

  feedbacks: Feedback[];

  payment: Payment;
}
