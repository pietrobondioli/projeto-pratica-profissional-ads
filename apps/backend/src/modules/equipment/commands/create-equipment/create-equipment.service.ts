import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok, Result } from 'neverthrow';
import { Repository } from 'typeorm';

import { EntityID } from '#/be/lib/ddd/entity.base';
import { MediaModel } from '#/be/modules/media/db/media.model';
import { MEDIA_REPO } from '#/be/modules/media/media.di-tokens';
import { EquipmentModel } from '../../db/equipment.model';
import { Equipment } from '../../domain/equipment.entity';
import { PhotoNotFoundError } from '../../domain/errors/photo-not-found.error';
import { EQUIPMENT_REPO } from '../../equipment.di-tokens';
import { CreateEquipmentCommand } from './create-equipment.command';

@CommandHandler(CreateEquipmentCommand)
export class CreateUserService
  implements IInferredCommandHandler<CreateEquipmentCommand>
{
  constructor(
    @Inject(EQUIPMENT_REPO)
    protected readonly equipmentRepo: Repository<EquipmentModel>,
    @Inject(MEDIA_REPO)
    protected readonly mediaRepo: Repository<MediaModel>,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: CreateEquipmentCommand,
  ): Promise<Result<EntityID, PhotoNotFoundError>> {
    const photo = await this.mediaRepo.findOneBy({
      id: command.payload.photoId,
    });

    if (!photo) {
      return new Err(new PhotoNotFoundError());
    }

    const equipment = new Equipment();
    equipment.description = command.payload.description;
    equipment.photo = photo;
    equipment.pricePerDay = command.payload.pricePerDay;

    await this.equipmentRepo.insert(equipment);

    return new Ok(equipment.id);
  }
}
