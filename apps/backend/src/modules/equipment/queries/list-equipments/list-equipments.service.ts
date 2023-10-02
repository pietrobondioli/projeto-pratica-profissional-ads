import { QueryResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok } from 'neverthrow';
import { Like } from 'typeorm';

import { EquipmentRepo } from '../../db/equipment.model';
import { EQUIPMENT_REPO } from '../../equipment.di-tokens';

import { ListEquipmentsQuery } from './list-equipments.query';

@QueryHandler(ListEquipmentsQuery)
export class ListEquipmentsQueryHandler
  implements IInferredQueryHandler<ListEquipmentsQuery>
{
  constructor(
    @Inject(EQUIPMENT_REPO)
    private readonly equipmentRepo: EquipmentRepo,
  ) {}

  async execute(
    query: ListEquipmentsQuery,
  ): Promise<QueryResult<ListEquipmentsQuery>> {
    const { title, page, limit, order } = query.payload;

    const equipments = await this.equipmentRepo.find({
      where: {
        ...(title && { title: Like(`%${title}%`) }),
      },
      skip: Math.max(0, (page - 1) * limit),
      take: limit,
      order: {
        [order.field]: order.param,
      },
      relations: ['owner', 'photo'],
    });

    return new Ok({
      items: equipments,
      page,
      limit,
      total: equipments.length,
    });
  }
}
