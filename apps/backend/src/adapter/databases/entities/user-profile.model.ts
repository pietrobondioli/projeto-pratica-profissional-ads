import { UserProfile } from '@/domain';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { MediaModel } from './media.model';

@Entity()
export class UserProfileModel extends BaseModel implements UserProfile {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  contact: string;

  @Column()
  address: string;

  @OneToOne(() => MediaModel)
  @JoinColumn()
  profilePicture?: MediaModel;

  @Column({ nullable: true })
  description?: string;

  @OneToOne(() => UserModel, (user) => user.userProfile)
  user: UserModel;
}
