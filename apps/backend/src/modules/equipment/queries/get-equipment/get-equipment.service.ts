import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QueryResult } from '@nestjs-architects/typed-cqrs';
import { Err, Ok } from 'neverthrow';

import { EquipmentRepo } from '../../db/equipment.model';
import { EquipmentNotFoundError } from '../../domain/errors/equipment-not-found.error';
import { EQUIPMENT_REPO } from '../../equipment.di-tokens';

import { GetEquipmentQuery } from './get-equipment.query';

@QueryHandler(GetEquipmentQuery)
export class GetEquipmentQueryHandler
  implements IInferredQueryHandler<GetEquipmentQuery>
{
  constructor(
    @Inject(EQUIPMENT_REPO)
    private readonly equipmentRepo: EquipmentRepo,
  ) {}

  async execute(
    query: GetEquipmentQuery,
  ): Promise<QueryResult<GetEquipmentQuery>> {
    const { equipmentId } = query.payload;

    const equipment = await this.equipmentRepo.findOneBy({
      id: equipmentId,
    });

    if (!equipment) {
      return new Err(new EquipmentNotFoundError());
    }

    return new Ok(equipment);
  }
}
