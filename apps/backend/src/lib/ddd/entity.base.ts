export type EntityID = string;

export class AppEntityBase {
  constructor(userID: string) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.createdBy = userID;
    this.updatedBy = userID;
  }

  id: EntityID;

  createdAt: Date;

  updatedAt: Date;

  createdBy: string;

  updatedBy: string;
}
