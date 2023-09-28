import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResponseDto } from '#/be/lib/api/paginated.response.base';
import { ResponseBase } from '#/be/lib/api/response.dto.base';

import { NotificationStatus } from '../../domain/notification.entity';

class NotificationDto extends ResponseBase {
  @ApiProperty({
    example: 'Your account has been created',
    description: 'Notification message',
  })
  message: string;

  @ApiProperty({
    example: 'Read',
    enum: NotificationStatus,
  })
  status: NotificationStatus;
}

export class ListUserNotificationsResDto extends PaginatedResponseDto<NotificationDto> {}
