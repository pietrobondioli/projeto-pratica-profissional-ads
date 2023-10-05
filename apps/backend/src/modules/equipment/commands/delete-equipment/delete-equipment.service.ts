import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok, Result } from 'neverthrow';

import { MediaRepo } from '#/be/modules/media/db/media.model';
import { MEDIA_REPO } from '#/be/modules/media/media.di-tokens';

import { EquipmentRepo } from '../../db/equipment.model';
import { EquipmentAggregate } from '../../domain/equipment.aggregate';
import { EquipmentNotFoundError } from '../../domain/errors/equipment-not-found.error';

import { EQUIPMENT_REPO } from './../../equipment.di-tokens';
import { DeleteEquipmentCommand } from './delete-equipment.command';

@CommandHandler(DeleteEquipmentCommand)
export class DeleteEquipmentCommandHandler
  implements IInferredCommandHandler<DeleteEquipmentCommand>
{
  constructor(
    @Inject(EQUIPMENT_REPO)
    private readonly equipmentRepo: EquipmentRepo,
    @Inject(MEDIA_REPO)
    private readonly mediaRepo: MediaRepo,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: DeleteEquipmentCommand,
  ): Promise<Result<true, EquipmentNotFoundError>> {
    try {
      const { equipmentId, loggedUser } = command.payload;

      const equipment = await this.equipmentRepo.findOneBy({
        id: equipmentId,
        owner: { id: loggedUser.id },
      });

      if (!equipment) {
        return new Err(new EquipmentNotFoundError());
      }

      await this.equipmentRepo.delete({
        id: equipmentId,
        owner: { id: loggedUser.id },
      });

      EquipmentAggregate.publishEvents(this.eventEmitter);

      return new Ok(true);
    } finally {
      EquipmentAggregate.clearEvents();
    }
  }
}
