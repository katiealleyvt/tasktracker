"use client";

import { createContext, useState } from "react";
import { tasks } from "../data/sample-data";
import type { Task } from "~/models/task";
import {
  updateTask as updateTaskAPI,
  createTask as createTaskAPI,
} from "~/data/task-calls";
import type { ObjectId } from "mongoose";
import type { Status } from "~/models/enum";

export const TaskContext = createContext<{
  items: Task[];
  setItems: React.Dispatch<React.SetStateAction<Task[]>>;
  updateTask: (id: ObjectId, updates: Partial<Task>) => Promise<void>;
  createTask: (status: Status) => Promise<void>;
}>({
  items: [],
  setItems: () => {},
  updateTask: async () => {},
  createTask: async () => {},
});

export function TaskProvider({
  children,
  initialTasks,
}: {
  children: React.ReactNode;
  initialTasks?: Task[];
}) {
  const [items, setItems] = useState<Task[]>(initialTasks ?? []);

  const updateTask = async (id: ObjectId, updates: Partial<Task>) => {
    try {
      const updatedTask = await updateTaskAPI(id, updates);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, ...updatedTask } : item
        )
      );
      return updatedTask;
    } catch (error) {
      console.error("Failed to update task:", error);
      throw error;
    }
  };
  const createTask = async (status: Status) => {
    try {
      const updatedTask = await createTaskAPI({
        name: "",
        points: 0,
        status: status,
      });
      setItems((prevItems) => [...prevItems, updatedTask]);
      return updatedTask;
    } catch (error) {
      console.error("Failed to update task:", error);
      throw error;
    }
  };
  return (
    <TaskContext.Provider value={{ items, setItems, updateTask, createTask }}>
      {children}
    </TaskContext.Provider>
  );
}
