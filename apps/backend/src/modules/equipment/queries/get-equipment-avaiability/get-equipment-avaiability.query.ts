import { Result } from 'neverthrow';

import { QueryBase } from '#/be/lib/ddd/query.base';

import { EquipmentNotFoundError } from '../../domain/errors/equipment-not-found.error';

type EquipmentAvailability = {
  notAvailableDates: Date[];
};

class Payload {
  readonly equipmentId: string;
  readonly startDate: Date;
  readonly endDate: Date;
}

export class GetEquipmentAvailabilityQuery extends QueryBase<
  Payload,
  Result<EquipmentAvailability, EquipmentNotFoundError>
> {}
