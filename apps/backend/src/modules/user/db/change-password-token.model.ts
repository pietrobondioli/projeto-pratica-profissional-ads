import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from '#/be/lib/db/base.model';
import { UserModel } from '#/be/modules/user/db/user.model';

import { ChangePasswordToken } from '../domain/change-password-token.entity';

@Entity()
export class ChangePasswordTokenModel
  extends BaseModel
  implements ChangePasswordToken
{
  @ManyToOne(() => UserModel)
  user: UserModel;

  @Column()
  token: string;

  @Column()
  expiresAt: Date;

  @Column({ nullable: true })
  consumedAt?: Date;

  @Column({ nullable: true })
  invalidatedAt?: Date;

  @Column({ nullable: true })
  consumerIp?: string;
}
