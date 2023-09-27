import { ResponseBase } from '#/be/lib/api/response.dto.base';
import { ApiProperty } from '@nestjs/swagger';

class Media extends ResponseBase {
  @ApiProperty({
    example: 'key',
    description: 'The key of the media',
  })
  readonly key: string;

  @ApiProperty({
    example: 'bucket',
    description: 'The bucket of the media',
  })
  readonly bucket: string;

  @ApiProperty({
    example: 'image/png',
    description: 'The mime type of the media',
  })
  readonly mimeType: string;
}

class UserProfileDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
  })
  readonly firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
  })
  readonly lastName: string;

  @ApiProperty({
    example: '+639123456789',
    description: 'The contact number of the user',
  })
  readonly contact: string;

  @ApiProperty({
    example: 'Manila, Philippines',
    description: 'The address of the user',
  })
  readonly address: string;

  @ApiProperty({
    type: () => Media,
    description: 'The profile picture of the user',
  })
  profilePicture?: Media;

  @ApiProperty({
    example: 'I am a software engineer',
    description: 'The description of the user',
  })
  readonly description?: string;
}

export class GetUserResDto extends ResponseBase {
  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'The email of the user',
  })
  readonly email: string;

  @ApiProperty({
    type: () => UserProfileDto,
    description: 'The profile of the user',
  })
  readonly profile: UserProfileDto;
}
