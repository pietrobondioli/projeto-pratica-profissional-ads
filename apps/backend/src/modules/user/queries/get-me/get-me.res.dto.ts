import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { ResponseBase } from '#/be/lib/api/response.dto.base';

class MediaDto extends ResponseBase {}

class UserProfileDto {
  @Expose()
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
  })
  readonly firstName: string;

  @Expose()
  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
  })
  readonly lastName: string;

  @Expose()
  @ApiProperty({
    example: '+639123456789',
    description: 'The contact number of the user',
  })
  readonly contact: string;

  @Expose()
  @ApiProperty({
    example: 'Manila, Philippines',
    description: 'The address of the user',
  })
  readonly address: string;

  @Expose()
  @Type(() => MediaDto)
  @ApiPropertyOptional({
    type: () => MediaDto,
    description: 'The profile picture of the user',
  })
  profilePicture?: MediaDto;

  @Expose()
  @ApiPropertyOptional({
    example: 'I am a software engineer',
    description: 'The description of the user',
  })
  readonly description?: string;
}

export class GetMeResDto extends ResponseBase {
  @Expose()
  @ApiProperty({
    example: 'john@gmail.com',
    description: 'The email of the user',
  })
  readonly email: string;

  @Expose()
  @Type(() => UserProfileDto)
  @ApiProperty({
    type: () => UserProfileDto,
    description: 'The profile of the user',
  })
  readonly userProfile: UserProfileDto;
}
