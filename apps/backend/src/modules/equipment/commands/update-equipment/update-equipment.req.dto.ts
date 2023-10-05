import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateEquipmentDto {
  @IsOptional()
  @MaxLength(128)
  @MinLength(5)
  @ApiPropertyOptional({
    example: 'Lorem ipsum',
    description: 'Equipment title',
  })
  readonly title: string;

  @IsOptional()
  @MaxLength(512)
  @MinLength(5)
  @ApiPropertyOptional({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description: 'Equipment description',
  })
  readonly description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({
    example: 'Abc1234-',
    description: 'Id of the uploaded photo',
  })
  readonly photoId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiPropertyOptional({
    example: 100,
    description: 'Price per day',
  })
  readonly pricePerDay: number;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @ApiPropertyOptional({
    example: true,
    description: 'Availability status',
  })
  readonly availabilityStatus: boolean;
}
