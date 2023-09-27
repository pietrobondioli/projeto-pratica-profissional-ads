import { Result } from 'neverthrow';

import {
  PaginatedQueryBase,
  PaginatedQueryPayloadBase,
  PaginatedQueryResultBase,
} from '#/be/lib/ddd/query.base';

import { Equipment } from '../../domain/equipment.entity';
import { EquipmentNotFoundError } from '../../domain/errors/equipment-not-found.error';

class Payload extends PaginatedQueryPayloadBase {
  title?: string;
}

export class ListEquipmentsQuery extends PaginatedQueryBase<
  Payload,
  Result<PaginatedQueryResultBase<Equipment>, EquipmentNotFoundError>
> {}
