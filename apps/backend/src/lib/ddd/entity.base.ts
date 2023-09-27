export type EntityID = string;

export class AppEntityBase {
  constructor(userID: string) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.createdBy = userID;
  }

  id: EntityID;

  createdAt: Date;

  updatedAt: Date;

  createdBy: string;

  updatedBy: string;
}
