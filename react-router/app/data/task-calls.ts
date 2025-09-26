import type { ObjectId } from "mongoose";
import type { Task } from "~/models/task";
import { api_host } from "~/root";

export const updateTask = async (id: ObjectId, updates: Partial<Task>) => {
  try {
    const response = await fetch(`${api_host}/api/tasks/update/${id}`, {
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
    const response = await fetch(`${api_host}/api/tasks/post`, {
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
export const getAllTasks = async () => {
  try {
    const response = await fetch(`${api_host}/api/tasks/getAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get tasks");
    }
    const tasks = await response.json();
    return tasks;
  } catch (error) {
    console.error("Error getting tasks:", error);
    throw error;
  }
};
export const deleteTask = async (id: ObjectId) => {
  try {
    const response = await fetch(`${api_host}/api/tasks/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    return;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
