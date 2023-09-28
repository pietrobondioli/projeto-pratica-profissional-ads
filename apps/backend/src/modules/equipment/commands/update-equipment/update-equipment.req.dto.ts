import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateEquipmentDto {
  @MaxLength(128)
  @MinLength(5)
  @ApiProperty({
    example: 'Lorem ipsum',
    description: 'Equipment title',
  })
  readonly title: string;

  @MaxLength(512)
  @MinLength(5)
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description: 'Equipment description',
  })
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Abc1234-',
    description: 'Id of the uploaded photo',
  })
  readonly photoId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 100,
    description: 'Price per day',
  })
  readonly pricePerDay: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Availability status',
  })
  readonly availabilityStatus: boolean;
}
