import { Column, Entity, ManyToOne, Repository } from 'typeorm';

import { BaseModel } from '#/be/lib/db/base.model';
import { UserModel } from '#/be/modules/user/db/user.model';

import { ChangePasswordToken } from '../domain/change-password-token.entity';

@Entity({
  name: 'change_password_token',
})
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

export type ChangePasswordTokenRepo = Repository<ChangePasswordTokenModel>;
