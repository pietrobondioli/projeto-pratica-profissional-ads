import { Payment, PaymentMethod } from '@/domain';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.model';
import { ReservationModel } from './reservation.model';

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
