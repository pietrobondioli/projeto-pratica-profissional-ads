import { MediaRepo } from '#/be/modules/media/db/media.model';
import { MEDIA_REPO } from '#/be/modules/media/media.di-tokens';
import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok } from 'neverthrow';
import { UserProfileRepo } from '../../db/user-profile.model';
import { UserProfileNotFoundError } from '../../domain/errors/user-profile-not-found.error';
import { UserAggregate } from '../../domain/user.aggregate';
import { USER_PROFILE_REPO } from '../../user.di-tokens';
import { UpdateUserProfileCommand } from './update-user-profile.command';

@CommandHandler(UpdateUserProfileCommand)
export class UpdateUserProfileCommandHandler
  implements IInferredCommandHandler<UpdateUserProfileCommand>
{
  constructor(
    @Inject(USER_PROFILE_REPO)
    private readonly userProfileRepo: UserProfileRepo,
    @Inject(MEDIA_REPO)
    private readonly mediaRepo: MediaRepo,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: UpdateUserProfileCommand,
  ): Promise<CommandResult<UpdateUserProfileCommand>> {
    try {
      const {
        loggedUser,
        firstName,
        lastName,
        contact,
        address,
        description,
        profilePictureId,
      } = command.payload;

      const userProfile = await this.userProfileRepo.findOne({
        where: {
          user: { id: loggedUser.id },
        },
      });

      if (!userProfile) {
        return new Err(new UserProfileNotFoundError());
      }

      if (profilePictureId) {
        const profilePicture = await this.mediaRepo.findOne({
          where: {
            id: profilePictureId,
          },
        });
        if (profilePicture) {
          userProfile.profilePicture = profilePicture;
        }
      }

      if (firstName) userProfile.firstName = firstName;
      if (lastName) userProfile.lastName = lastName;
      if (contact) userProfile.contact = contact;
      if (address) userProfile.address = address;
      if (description) userProfile.description = description;

      await this.userProfileRepo.save(userProfile);

      UserAggregate.user(loggedUser.id).updatedProfile();

      UserAggregate.publishEvents(this.eventEmitter);

      return new Ok(userProfile.id);
    } finally {
      UserAggregate.clearEvents();
    }
  }
}
