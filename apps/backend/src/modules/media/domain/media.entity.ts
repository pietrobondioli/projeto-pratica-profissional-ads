import { AppEntityBase } from '#/be/lib/ddd/entity.base';

export class Media extends AppEntityBase {
  key: string;

  bucket: string;

  mimeType: string;
}
