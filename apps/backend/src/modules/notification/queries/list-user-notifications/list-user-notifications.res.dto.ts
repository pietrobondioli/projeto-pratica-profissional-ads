import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { PaginatedResponseDto } from '#/be/lib/api/paginated.response.base';
import { ResponseBase } from '#/be/lib/api/response.dto.base';

import { NotificationStatus } from '../../domain/notification.entity';

class NotificationDto extends ResponseBase {
  @Expose()
  @ApiProperty({
    example: 'Your account has been created',
    description: 'Notification message',
  })
  message: string;

  @Expose()
  @ApiProperty({
    example: 'Read',
    enum: NotificationStatus,
  })
  status: NotificationStatus;
}

export class ListUserNotificationsResDto extends PaginatedResponseDto<NotificationDto> {
  @Expose()
  @Type(() => NotificationDto)
  @ApiProperty({
    description: 'Array of notifications',
    type: () => [NotificationDto],
    isArray: true,
  })
  readonly items: NotificationDto[];
}
