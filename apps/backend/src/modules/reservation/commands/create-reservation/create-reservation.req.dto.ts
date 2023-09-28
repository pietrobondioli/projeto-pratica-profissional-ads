import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class CreateReservationReqDto {
  @ApiProperty({
    example: 'equipment-id-1',
    description: 'Equipment ID',
  })
  readonly equipmentId: string;

  @Type(() => Date)
  @IsDate()
  @ApiProperty({
    example: '2023-09-28T21:30:50.066Z',
    description: 'Start date',
  })
  readonly startDate: Date;

  @Type(() => Date)
  @IsDate()
  @ApiProperty({
    example: '2023-09-28T21:30:50.066Z',
    description: 'End date',
  })
  readonly endDate: Date;
}
