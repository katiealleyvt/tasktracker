import type { ObjectId } from "mongoose";
import type { Task } from "~/models/task";

export const updateTask = async (id: ObjectId, updates: Partial<Task>) => {
  try {
    const response = await fetch(`/api/tasks/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};
export const createTask = async (updates: Partial<Task>) => {
  try {
    const response = await fetch(`/api/tasks/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};
