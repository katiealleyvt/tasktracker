import type { ObjectId } from "mongoose";

export class Reward {
  constructor(
    public name: string,
    public cost: number,
    public isArchived: boolean,
    public _id?: ObjectId
  ) {}
}
