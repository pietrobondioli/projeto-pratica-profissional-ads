import { PaginatedResponseDto } from '#/be/lib/api/paginated.response.base';
import { ResponseBase } from '#/be/lib/api/response.dto.base';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class UserDto extends ResponseBase {}

class ReservationDto extends ResponseBase {}

class FeedbackDto extends ResponseBase {
  @Expose()
  @Type(() => UserDto)
  @ApiProperty({
    type: UserDto,
    description: 'Feedback author',
  })
  readonly fromUser: UserDto;

  @Expose()
  @Type(() => ReservationDto)
  @ApiProperty({
    type: ReservationDto,
    description: 'Feedback reservation',
  })
  readonly reservation: ReservationDto;

  @Expose()
  @ApiProperty({
    example: 5,
    description: 'Feedback rating',
  })
  readonly rating: number;

  @Expose()
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description: 'Feedback comment',
  })
  readonly comment: string;
}

export class ListUserFeedbacksResDto extends PaginatedResponseDto<FeedbackDto> {
  @Expose()
  @Type(() => FeedbackDto)
  @ApiProperty({
    description: 'Array of feedbacks',
    type: () => [FeedbackDto],
    isArray: true,
  })
  readonly items: FeedbackDto[];
}
