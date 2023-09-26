import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateEquipmentDto {
  @ApiProperty({
    example: 'Lorem ipsum',
    description: 'Equipment title',
  })
  @MaxLength(128)
  @MinLength(5)
  readonly title: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description: 'Equipment description',
  })
  @MaxLength(512)
  @MinLength(5)
  readonly description: string;

  @ApiProperty({
    example: 'Abc1234-',
    description: 'Id of the uploaded photo',
  })
  @IsString()
  @IsNotEmpty()
  readonly photoId: string;

  @ApiProperty({
    example: 100,
    description: 'Price per day',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly pricePerDay: number;
}
