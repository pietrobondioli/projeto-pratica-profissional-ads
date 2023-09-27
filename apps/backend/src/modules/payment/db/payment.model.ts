import { Column, Entity, ManyToOne, Repository } from 'typeorm';

import { BaseModel } from '#/be/lib/db/base.model';
import { ReservationModel } from '#/be/modules/reservation/db/reservation.model';

import { Payment, PaymentMethod } from '../domain/payment.entity';

@Entity()
export class PaymentModel extends BaseModel implements Payment {
  @ManyToOne(() => ReservationModel, (reservation) => reservation.payment)
  reservation: ReservationModel;

  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Column()
  amount: number;

  @Column()
  paymentDate: Date;
}

export type PaymentRepo = Repository<PaymentModel>;
