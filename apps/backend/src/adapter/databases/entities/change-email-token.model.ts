import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.model';
import { ChangeEmailToken } from '@/domain';
import { UserModel } from './user.model';

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
