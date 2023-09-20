export type EntityID = string;

export class AppEntityBase {
  id: EntityID;

  createdAt: Date;

  updatedAt: Date;

  createdBy: string;

  updatedBy: string;
}
