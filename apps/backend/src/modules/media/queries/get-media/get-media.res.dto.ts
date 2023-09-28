import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetMediaResDto {
  @Expose()
  @ApiProperty({
    example: 'media-key',
    description: 'Media key',
  })
  readonly key: string;

  @Expose()
  @ApiProperty({
    example: 'bucket-name',
    description: 'Bucket name',
  })
  readonly bucket: string;

  @Expose()
  @ApiProperty({
    example: 'image/png',
    description: 'Media mime type',
  })
  readonly mimeType: string;
}
