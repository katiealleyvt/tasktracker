import { ObjectId } from "mongoose";

export class Item {
  constructor(
    public name: string,
    public number: number,
    public _id?: ObjectId
  ) {}
}
