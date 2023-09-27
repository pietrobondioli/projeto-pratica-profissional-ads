import { Column, Entity, ManyToOne, Repository } from 'typeorm';

import { BaseModel } from '#/be/lib/db/base.model';
import { UserModel } from '#/be/modules/user/db/user.model';

import { EmailVerificationToken } from '../domain/email-verification-token.entity';

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

export type EmailVerificationTokenRepo =
  Repository<EmailVerificationTokenModel>;
