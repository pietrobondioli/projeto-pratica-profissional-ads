import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { PaginatedQueryRequestDto } from '#/be/lib/api/paginated-query.request.dto';

export class ListEquipmentsReqDto extends PaginatedQueryRequestDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Equipment1',
    description: 'Equipment title',
  })
  readonly title?: string;
}
