import { Column, Entity } from 'typeorm';

import { BaseModel } from '#/be/lib/db/base.model';

import { Media } from '../domain/media.entity';

@Entity()
export class MediaModel extends BaseModel implements Media {
  @Column()
  key: string;

  @Column()
  bucket: string;

  @Column()
  mimeType: string;

  @Column()
  lastUpdated: Date;
}
