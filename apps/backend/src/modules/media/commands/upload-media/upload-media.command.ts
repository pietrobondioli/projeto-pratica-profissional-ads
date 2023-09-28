import { Result } from 'neverthrow';

import { UserPayload } from '#/be/lib/application/decorators/auth-user.decorator';
import { CommandBase } from '#/be/lib/ddd/command.base';
import { EntityID } from '#/be/lib/ddd/entity.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

class Payload {
  readonly buffer: Buffer;
  readonly originalname: string;
  readonly fieldname: string;
  readonly mimetype: string;
  readonly size: number;
  readonly loggedUser: UserPayload;
}

export class UploadMediaCommand extends CommandBase<
  Payload,
  Result<EntityID, ExceptionBase>
> {}
