import { Status } from "~/models/enum";
import { Reward } from "~/models/reward";
import { Task } from "~/models/task";

export const tasks: Task[] = [
  new Task("Brush teeth", 1, Status.Daily, "1"),
  new Task("Wash face", 5, Status.Daily, "2"),
  new Task("Meditate", 15, Status.Daily, "3"),
  new Task("Laundry", 3, Status.Todo, "4"),
  new Task("Medication", 1, Status.Done, "5"),
];
export const rewards: Reward[] = [new Reward("Massage", 30, false, "1")];
