import { PaginatedResponseDto } from '#/be/lib/api/paginated.response.base';
import { ResponseBase } from '#/be/lib/api/response.dto.base';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class PhotoDto extends ResponseBase {}

export class EquipmentDto extends ResponseBase {
  @Expose()
  @ApiProperty({
    example: 'Lorem ipsum',
    description: 'Equipment title',
  })
  readonly title: string;

  @Expose()
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description: 'Equipment description',
  })
  readonly description: string;

  @Expose()
  @ApiProperty({
    example: 100,
    description: 'Price per day',
  })
  readonly pricePerDay: number;

  @Expose()
  @ApiProperty({
    example: true,
    description: 'Availability status',
  })
  readonly availabilityStatus: boolean;

  @Expose()
  @Type(() => PhotoDto)
  @ApiProperty({
    example: true,
    type: PhotoDto,
    description: 'Availability status',
  })
  readonly photo: PhotoDto;
}

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
