import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

import { OrderBy } from '../ddd/query.base';

export class PaginatedQueryRequestDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99999)
  @Type(() => Number)
  @ApiPropertyOptional({
    example: 10,
    description: 'Specifies a limit of returned records',
    required: false,
  })
  readonly limit: number = 10;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99999)
  @Type(() => Number)
  @ApiPropertyOptional({
    example: 0,
    description: 'Page number',
    required: false,
  })
  readonly page: number = 0;

  @IsOptional()
  @ApiPropertyOptional({
    example: { field: 'createdAt', param: 'asc' },
    description: 'Order by field and param',
    required: false,
  })
  readonly order: OrderBy = { field: 'createdAt', param: 'asc' };
}
