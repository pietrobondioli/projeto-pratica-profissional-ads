import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeEmailRequestDto {
  @ApiProperty({
    example: 'some-random-token',
    description: 'Email verification token',
  })
  @IsString()
  @IsNotEmpty()
  readonly token: string;
}
