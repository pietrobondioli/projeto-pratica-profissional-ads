import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserProfileRepo } from '../../db/user-profile.model';
import { UserRepo } from '../../db/user.model';
import { UserCreatedEvent } from '../../domain/events/user-created.event';
import { UserProfile } from '../../domain/user-profile.entity';
import { USER_PROFILE_REPO, USER_REPO } from '../../user.di-tokens';

@Injectable()
export class OnUserCreatedCreateProfileEventHandler {
  constructor(
    @Inject(USER_PROFILE_REPO)
    private readonly userProfileRepo: UserProfileRepo,
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
  ) {}

  @OnEvent(UserCreatedEvent.name, { async: true, promisify: true })
  async handle(event: UserCreatedEvent): Promise<any> {
    const user = await this.userRepo.findOneBy({
      id: event.payload.userId,
    });

    if (!user) {
      return;
    }

    const userProfile = new UserProfile('admin');

    const createdUserProfile = await this.userProfileRepo.save(userProfile);

    user.userProfile = createdUserProfile;

    await this.userRepo.save(user);
  }
}
