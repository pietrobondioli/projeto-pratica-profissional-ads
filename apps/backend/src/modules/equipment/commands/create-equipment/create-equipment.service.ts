import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok, Result } from 'neverthrow';

import { EntityID } from '#/be/lib/ddd/entity.base';
import { MEDIA_REPO } from '#/be/modules/media/media.di-tokens';

import { Equipment } from '../../domain/equipment.entity';
import { PhotoNotFoundError } from '../../domain/errors/photo-not-found.error';
import { EQUIPMENT_REPO } from '../../equipment.di-tokens';

import { ReqContextProvider } from '#/be/lib/application/request/req.context';
import { MediaRepo } from '#/be/modules/media/db/media.model';
import { EquipmentRepo } from '../../db/equipment.model';
import { CreateEquipmentCommand } from './create-equipment.command';

@CommandHandler(CreateEquipmentCommand)
export class CreateUserCommandHandler
  implements IInferredCommandHandler<CreateEquipmentCommand>
{
  constructor(
    @Inject(EQUIPMENT_REPO)
    private readonly equipmentRepo: EquipmentRepo,
    @Inject(MEDIA_REPO)
    private readonly mediaRepo: MediaRepo,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: CreateEquipmentCommand,
  ): Promise<Result<EntityID, PhotoNotFoundError>> {
    const photo = await this.mediaRepo.findOneBy({
      id: command.payload.photoId,
    });

    const authUser = ReqContextProvider.getAuthUser();

    if (!photo) {
      return new Err(new PhotoNotFoundError());
    }

    const equipment = new Equipment(authUser.id);
    equipment.description = command.payload.description;
    equipment.photo = photo;
    equipment.pricePerDay = command.payload.pricePerDay;

    await this.equipmentRepo.insert(equipment);

    return new Ok(equipment.id);
  }
}
