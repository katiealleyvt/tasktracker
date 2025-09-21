import type { ObjectId } from "mongoose";
import type { Status } from "./enum";

export class Task {
  constructor(
    public name: string,
    public points: number,
    public status: Status,
    public _id?: ObjectId
  ) {}
}
