import { Media } from '@/domain';
import { Column, Entity } from 'typeorm';
import { BaseModel } from './base.model';

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
