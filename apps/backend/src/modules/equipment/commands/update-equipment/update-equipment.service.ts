import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok, Result } from 'neverthrow';
import { Repository } from 'typeorm';
import { EQUIPMENT_REPO } from './../../equipment.di-tokens';

import { EntityID } from '#/be/lib/ddd/entity.base';
import { MediaModel } from '#/be/modules/media/db/media.model';
import { MEDIA_REPO } from '#/be/modules/media/media.di-tokens';
import { EquipmentModel } from '../../db/equipment.model';
import { EquipmentAggregate } from '../../domain/equipment.aggregate';
import { EquipmentNotFoundError } from '../../domain/errors/equipment-not-found.error';
import { PhotoNotFoundError } from '../../domain/errors/photo-not-found.error';
import { UpdateEquipmentCommand } from './update-equipment.command';

@CommandHandler(UpdateEquipmentCommand)
export class UpdateEquipmentService
  implements IInferredCommandHandler<UpdateEquipmentCommand>
{
  constructor(
    @Inject(EQUIPMENT_REPO)
    protected readonly equipmentRepo: Repository<EquipmentModel>,
    @Inject(MEDIA_REPO)
    protected readonly mediaRepo: Repository<MediaModel>,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: UpdateEquipmentCommand,
  ): Promise<Result<EntityID, PhotoNotFoundError | EquipmentNotFoundError>> {
    try {
      const photo = await this.mediaRepo.findOneBy({
        id: command.payload.photoId,
      });

      if (!photo) {
        return new Err(new PhotoNotFoundError());
      }

      const equipment = await this.equipmentRepo.findOneBy({
        id: command.payload.id,
      });

      if (!equipment) {
        return new Err(new EquipmentNotFoundError());
      }

      equipment.title = command.payload.title;
      equipment.description = command.payload.description;
      equipment.photo = photo;
      equipment.pricePerDay = command.payload.pricePerDay;

      await this.equipmentRepo.save(equipment);

      EquipmentAggregate.publishEvents(this.eventEmitter);

      return new Ok('');
    } finally {
      EquipmentAggregate.clearEvents();
    }
  }
}