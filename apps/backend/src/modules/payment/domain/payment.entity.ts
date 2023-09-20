import { AppBaseEntity } from '#/be/lib/ddd/base.entity';
import { Reservation } from '#/be/modules/reservation/domain/reservation.entity';

export enum PaymentMethod {
  CREDIT_CARD = 'CreditCard',
  PIX = 'Pix',
}

export class Payment extends AppBaseEntity {
  reservation: Reservation;

  paymentMethod: PaymentMethod;

  amount: number;

  paymentDate: Date;
}
