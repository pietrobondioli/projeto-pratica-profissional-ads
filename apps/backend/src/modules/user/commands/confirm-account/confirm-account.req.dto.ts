import { ApiProperty } from '@nestjs/swagger';

export class ConfirmAccountReqDto {
  @ApiProperty({
    example: 'some-random-token',
    description: 'Confirmation token sent to the user',
  })
  readonly token: string;
}
