import { AppBaseEntity } from '#/be/lib/ddd/base.entity';

export class Media extends AppBaseEntity {
  key: string;

  bucket: string;

  mimeType: string;

  lastUpdated: Date;
}
