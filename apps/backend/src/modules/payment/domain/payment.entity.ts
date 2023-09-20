import { AppEntityBase } from '#/be/lib/ddd/entity.base';
import { Reservation } from '#/be/modules/reservation/domain/reservation.entity';

export enum PaymentMethod {
  CREDIT_CARD = 'CreditCard',
  PIX = 'Pix',
}

export class Payment extends AppEntityBase {
  reservation: Reservation;

  paymentMethod: PaymentMethod;

  amount: number;

  paymentDate: Date;
}
