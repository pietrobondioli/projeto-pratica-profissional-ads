import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok, Result } from 'neverthrow';

import { EntityID } from '#/be/lib/ddd/entity.base';
import { MediaRepo } from '#/be/modules/media/db/media.model';
import { MEDIA_REPO } from '#/be/modules/media/media.di-tokens';

import { EquipmentRepo } from '../../db/equipment.model';
import { EquipmentAggregate } from '../../domain/equipment.aggregate';
import { EquipmentNotFoundError } from '../../domain/errors/equipment-not-found.error';
import { PhotoNotFoundError } from '../../domain/errors/photo-not-found.error';

import { EQUIPMENT_REPO } from './../../equipment.di-tokens';
import { UpdateEquipmentCommand } from './update-equipment.command';

@CommandHandler(UpdateEquipmentCommand)
export class UpdateEquipmentCommandHandler
  implements IInferredCommandHandler<UpdateEquipmentCommand>
{
  constructor(
    @Inject(EQUIPMENT_REPO)
    private readonly equipmentRepo: EquipmentRepo,
    @Inject(MEDIA_REPO)
    private readonly mediaRepo: MediaRepo,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: UpdateEquipmentCommand,
  ): Promise<Result<EntityID, PhotoNotFoundError | EquipmentNotFoundError>> {
    try {
      const {
        equipmentId,
        photoId,
        description,
        title,
        pricePerDay,
        availabilityStatus,
      } = command.payload;

      const equipment = await this.equipmentRepo.findOneBy({
        id: equipmentId,
      });

      if (!equipment) {
        return new Err(new EquipmentNotFoundError());
      }

      if (photoId) {
        const photo = await this.mediaRepo.findOneBy({ id: photoId });

        if (!photo) {
          return new Err(new PhotoNotFoundError());
        }

        equipment.photo = photo;
      }

      if (title) equipment.title = title;
      if (description) equipment.description = description;
      if (pricePerDay) equipment.pricePerDay = pricePerDay;
      if (availabilityStatus) equipment.availabilityStatus = availabilityStatus;

      await this.equipmentRepo.save(equipment);

      EquipmentAggregate.publishEvents(this.eventEmitter);

      return new Ok(equipment.id);
    } finally {
      EquipmentAggregate.clearEvents();
    }
  }
}
