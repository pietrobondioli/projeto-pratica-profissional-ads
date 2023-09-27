import { Column, Entity, JoinColumn, OneToOne, Repository } from 'typeorm';

import { BaseModel } from '#/be/lib/db/base.model';
import { MediaModel } from '#/be/modules/media/db/media.model';
import { UserModel } from '#/be/modules/user/db/user.model';

import { UserProfile } from '../domain/user-profile.entity';

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

export type UserProfileRepo = Repository<UserProfileModel>;
