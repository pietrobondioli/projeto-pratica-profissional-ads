import { AggregateBase } from '#/be/lib/ddd/aggregate.base';

export class MediaAggregate extends AggregateBase {
  private static _mediaId: string;

  static entityID(mediaId: string) {
    this._mediaId = mediaId;

    return this;
  }
}
