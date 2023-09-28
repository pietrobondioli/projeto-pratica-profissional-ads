import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Err, Ok } from 'neverthrow';

import { MediaRepo } from '#/be/modules/media/db/media.model';
import { MEDIA_REPO } from '#/be/modules/media/media.di-tokens';

import { EquipmentRepo } from '../../db/equipment.model';
import { Equipment } from '../../domain/equipment.entity';
import { PhotoNotFoundError } from '../../domain/errors/photo-not-found.error';
import { EQUIPMENT_REPO } from '../../equipment.di-tokens';

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
  ): Promise<CommandResult<CreateEquipmentCommand>> {
    const { loggedUser, photoId, description, pricePerDay } = command.payload;

    const photo = await this.mediaRepo.findOneBy({
      id: photoId,
    });

    if (!photo) {
      return new Err(new PhotoNotFoundError());
    }

    const equipment = new Equipment(loggedUser.id);
    equipment.description = description;
    equipment.photo = photo;
    equipment.pricePerDay = pricePerDay;

    await this.equipmentRepo.insert(equipment);

    return new Ok(equipment.id);
  }
}
