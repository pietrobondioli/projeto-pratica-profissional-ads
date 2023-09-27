import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetChatReqDto {
  @ApiProperty({
    example: 'chat-id-1',
    description: 'Chat ID',
  })
  @IsString()
  @IsNotEmpty()
  readonly chatId: string;
}
