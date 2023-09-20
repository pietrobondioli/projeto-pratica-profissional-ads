import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from '#/be/lib/db/base.model';
import { UserModel } from '#/be/modules/user/db/user.model';

import { ChangeEmailToken } from '../domain/change-email-token.entity';

@Entity()
export class ChangeEmailTokenModel
  extends BaseModel
  implements ChangeEmailToken
{
  @ManyToOne(() => UserModel)
  user: UserModel;

  @Column()
  newEmail: string;

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
