import { EmailVerificationToken } from '@/domain';
import { BaseModel } from './base.model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserModel } from './user.model';

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
