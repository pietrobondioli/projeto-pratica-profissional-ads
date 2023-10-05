import { AggregateBase } from '#/be/lib/ddd/aggregate.base';
import { EquipmentCreatedEvent } from './events/equipment-created.event';
import { EquipmentDeletedEvent } from './events/equipment-deleted.event';
import { EquipmentUpdatedEvent } from './events/equipment-updated.event';

export class EquipmentAggregate extends AggregateBase {
  private static _equipmentId: string;
  private static _userId: string;

  static entityID(equipmentId: string) {
    this._equipmentId = equipmentId;

    return this;
  }

  static userId(userId: string) {
    this._userId = userId;

    return this;
  }

  static created() {
    this.addDomainEvent(
      new EquipmentCreatedEvent({
        equipmentId: this._equipmentId,
        userId: this._userId,
      }),
    );
  }

  static updated() {
    this.addDomainEvent(
      new EquipmentUpdatedEvent({
        equipmentId: this._equipmentId,
        userId: this._userId,
      }),
    );
  }

  static deleted(equipmentName: string) {
    this.addDomainEvent(
      new EquipmentDeletedEvent({
        equipmentName,
        userId: this._userId,
      }),
    );
  }
}
