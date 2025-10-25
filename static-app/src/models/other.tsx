import { ObjectId } from "mongoose";

export class Item {
  constructor(
    public name: string,
    public number: number,
    public createdOn?: Date,
    public updatedOn?: Date,
    public archivedOn?: Date,
    public _id?: ObjectId
  ) {}
}
