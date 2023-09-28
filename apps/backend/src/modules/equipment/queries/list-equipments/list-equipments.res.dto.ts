import { PaginatedResponseDto } from '#/be/lib/api/paginated.response.base';
import { ResponseBase } from '#/be/lib/api/response.dto.base';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class EquipmentDto extends ResponseBase {}

export class ListEquipmentResDto extends PaginatedResponseDto<EquipmentDto> {
  @Expose()
  @Type(() => EquipmentDto)
  @ApiProperty({
    description: 'Array of equipments',
    type: () => [EquipmentDto],
    isArray: true,
  })
  readonly items: EquipmentDto[];
}
