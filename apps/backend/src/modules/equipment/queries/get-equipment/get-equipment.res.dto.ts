import { ApiProperty } from '@nestjs/swagger';

import { Equipment } from '../../domain/equipment.entity';

export class GetEquipmentResDto {
  constructor(equipment: Equipment) {
    this.id = equipment.id;
  }

  @ApiProperty({
    example: 'Equipment1',
    description: 'Equipment id',
  })
  readonly id: string;
}
