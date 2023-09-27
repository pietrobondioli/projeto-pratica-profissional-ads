import { ApiProperty } from '@nestjs/swagger';

export class ReadNotificationReqParamsDto {
  @ApiProperty({
    example: 'notification-id-1',
    description: 'Notification ID',
  })
  readonly notificationId: string;
}
