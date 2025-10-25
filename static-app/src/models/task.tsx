import type { ObjectId } from "mongoose";
import type { Status } from "./enum";
import { Item } from "./other";

export class Task extends Item {
  constructor(
    public name: string,
    public points: number,
    public status: Status,
    public _id?: ObjectId
  ) {
    super(name, points, _id);
  }
}
