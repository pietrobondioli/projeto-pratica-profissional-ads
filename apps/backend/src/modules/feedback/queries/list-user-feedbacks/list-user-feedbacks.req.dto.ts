import { PaginatedQueryRequestDto } from '#/be/lib/api/paginated-query.request.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ListUserFeedbacksReqDto extends PaginatedQueryRequestDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'user_id_1',
    description: 'User id to filter feedbacks',
  })
  readonly userId: string;
}
