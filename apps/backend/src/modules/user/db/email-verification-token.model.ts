import { Column, Entity, ManyToOne } from 'typeorm';

import { EmailVerificationToken } from '../domain/email-verification-token.entity';

import { BaseModel } from '#/be/lib/db/base.model';
import { UserModel } from '#/be/modules/user/db/user.model';

@Entity()
export class EmailVerificationTokenModel
  extends BaseModel
  implements EmailVerificationToken
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
