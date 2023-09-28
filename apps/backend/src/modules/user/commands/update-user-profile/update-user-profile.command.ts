import { Result } from 'neverthrow';

import { UserPayload } from '#/be/lib/application/decorators/auth-user.decorator';
import { CommandBase } from '#/be/lib/ddd/command.base';
import { EntityID } from '#/be/lib/ddd/entity.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

class Payload {
  readonly firstName: string;
  readonly lastName: string;
  readonly contact: string;
  readonly address: string;
  readonly description: string;
  readonly profilePictureId?: string;
  loggedUser: UserPayload;
}

export class UpdateUserProfileCommand extends CommandBase<
  Payload,
  Result<EntityID, ExceptionBase>
> {}
