import type { ObjectId } from "mongoose";
import { Item } from "./other";

export class Reward extends Item {
  constructor(
    public name: string,
    public cost: number,
    public isArchived: boolean,
    public _id?: ObjectId
  ) {
    super(name, cost, _id);
  }
}
