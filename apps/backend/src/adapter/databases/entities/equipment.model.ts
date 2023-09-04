import { Equipment } from '@/domain';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { ReservationModel } from './reservation.model';

@Entity()
export class EquipmentModel extends BaseModel implements Equipment {
  @Column()
  description: string;

  @Column()
  photo: string;

  @Column()
  pricePerDay: number;

  @Column()
  availabilityStatus: boolean;

  @ManyToOne(() => UserModel, (user) => user.equipment)
  owner: UserModel;

  @OneToMany(() => ReservationModel, (reservation) => reservation.equipment)
  reservations: ReservationModel[];
}
