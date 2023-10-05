export type EntityID = string;

export class AppEntityBase {
  constructor(createdByUserId?: string) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    if (createdByUserId) {
      this.createdBy = createdByUserId;
      this.updatedBy = createdByUserId;
    }
  }

  id: EntityID;

  createdAt: Date;

  updatedAt: Date;

  createdBy: string;

  updatedBy: string;
}
