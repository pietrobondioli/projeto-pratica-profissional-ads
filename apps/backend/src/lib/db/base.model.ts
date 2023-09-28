import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AppEntityBase } from '#/be/lib/ddd/entity.base';

export abstract class BaseModel extends BaseEntity implements AppEntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    default: 'system',
  })
  createdBy: string;

  @Column({
    default: 'system',
  })
  updatedBy: string;
}
