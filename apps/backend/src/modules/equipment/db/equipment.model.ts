import { Column, Entity, ManyToOne, OneToMany, Repository } from 'typeorm';

import { BaseModel } from '#/be/lib/db/base.model';
import { MediaModel } from '#/be/modules/media/db/media.model';
import { ReservationModel } from '#/be/modules/reservation/db/reservation.model';
import { UserModel } from '#/be/modules/user/db/user.model';

import { Equipment } from '../domain/equipment.entity';

@Entity()
export class EquipmentModel extends BaseModel implements Equipment {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  photo: MediaModel;

  @Column()
  pricePerDay: number;

  @Column()
  availabilityStatus: boolean;

  @ManyToOne(() => UserModel, (user) => user.equipment)
  owner: UserModel;

  @OneToMany(() => ReservationModel, (reservation) => reservation.equipment)
  reservations: ReservationModel[];
}

export type EquipmentRepo = Repository<EquipmentModel>;
