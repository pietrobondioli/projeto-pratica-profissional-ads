import { QueryResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok } from 'neverthrow';
import { Like, Repository } from 'typeorm';

import { EquipmentModel } from '../../db/equipment.model';
import { EQUIPMENT_REPO } from '../../equipment.di-tokens';

import { ListEquipmentsQuery } from './list-equipments.query';

@QueryHandler(ListEquipmentsQuery)
export class ListEquipmentsQueryHandler
  implements IInferredQueryHandler<ListEquipmentsQuery>
{
  constructor(
    @Inject(EQUIPMENT_REPO)
    private readonly equipmentRepo: Repository<EquipmentModel>,
  ) {}

  async execute(
    query: ListEquipmentsQuery,
  ): Promise<QueryResult<ListEquipmentsQuery>> {
    const { title, page, limit, order } = query.payload;

    const equipments = await this.equipmentRepo.find({
      where: {
        title: Like(`%${title}%`),
      },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        [order.field === true ? 'createdAt' : order.field]: order.param,
      },
    });

    return new Ok({
      items: equipments,
      page,
      limit,
      total: equipments.length,
    });
  }
}
