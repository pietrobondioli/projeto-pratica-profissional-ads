import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ResponseBase } from '#/be/lib/api/response.dto.base';
import { Expose, Type } from 'class-transformer';

class MediaDto extends ResponseBase {
  @Expose()
  @ApiProperty({
    example: 'key',
    description: 'The key of the media',
  })
  readonly key: string;

  @Expose()
  @ApiProperty({
    example: 'bucket',
    description: 'The bucket of the media',
  })
  readonly bucket: string;

  @Expose()
  @ApiProperty({
    example: 'image/png',
    description: 'The mime type of the media',
  })
  readonly mimeType: string;
}

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

export class GetUserResDto extends ResponseBase {
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
