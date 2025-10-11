import type { ObjectId } from "mongoose";
import { api_host } from "../App";
import { Task } from "../models/task";
import { getData, postData } from "./fetchData";

export const updateTask = async (
  id: ObjectId,
  updates: Partial<Task>,
  token: string
) => {
  return postData(
    `${api_host}/api/tasks/update/${id}`,
    updates,
    "PATCH",
    "update task"
  );
};
export const createTask = async (updates: Partial<Task>, token: string) => {
  return postData(`${api_host}/api/tasks/post`, updates, "POST", "update task");
};
export const getAllTasks = async (token: string) => {
  return getData(`${api_host}/api/tasks/getAll`, "GET", "get tasks");
};
export const deleteTask = async (id: ObjectId, token: string) => {
  return getData(`${api_host}/api/tasks/delete/${id}`, "DELETE", "delete task");
};
