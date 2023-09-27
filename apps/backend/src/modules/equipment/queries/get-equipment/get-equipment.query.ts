import { Result } from 'neverthrow';

import { QueryBase } from '#/be/lib/ddd/query.base';

import { Equipment } from '../../domain/equipment.entity';
import { EquipmentNotFoundError } from '../../domain/errors/equipment-not-found.error';

class Payload {
  readonly equipmentId: string;
}

export class GetEquipmentQuery extends QueryBase<
  Payload,
  Result<Equipment, EquipmentNotFoundError>
> {}
