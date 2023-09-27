import { ApiProperty } from '@nestjs/swagger';

export class DeleteFeedbackReqDto {
  @ApiProperty({
    example: 'feedback-id-1',
    description: 'Feedback ID',
  })
  readonly id: string;
}
