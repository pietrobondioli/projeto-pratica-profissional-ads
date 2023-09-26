import { PaginatedResponseDto } from '#/be/lib/api/paginated.response.base';
import { ApiProperty } from '@nestjs/swagger';
import { Equipment } from '../../domain/equipment.entity';

class EquipmentResDto {
  constructor(equipment: Equipment) {
    this.id = equipment.id;
  }

  @ApiProperty({
    example: 'Equipment1',
    description: 'Equipment id',
  })
  readonly id: string;
}

export class ListEquipmentResDto extends PaginatedResponseDto<EquipmentResDto> {
  readonly items: readonly EquipmentResDto[];

  constructor(
    equipments: readonly Equipment[],
    total: number,
    limit: number,
    page: number,
  ) {
    super({ total, limit, page });
    this.items = equipments.map((eq) => new EquipmentResDto(eq));
  }
}
