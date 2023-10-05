import { ResponseBase } from '#/be/lib/api/response.dto.base';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

class PhotoDto extends ResponseBase {}

class OwnerDto extends ResponseBase {}

export class GetEquipmentAvailabilityResDto extends ResponseBase {
  @Expose()
  @ApiProperty({
    isArray: true,
    description: 'A list of not available dates for the equipment',
    type: Date,
  })
  readonly notAvailableDates: Date[];
}
