"use client";

import { createContext, useEffect, useState } from "react";

import type { ObjectId } from "mongoose";
import { Status } from "@/models/enum";
import { Task } from "@/models/task";
import {
  updateTask as updateTaskAPI,
  createTask as createTaskAPI,
  deleteTask as deleteTaskAPI,
  getAllTasks,
} from "../data/task-calls.ts";

export const TaskContext = createContext<{
  items: Task[];
  setItems: React.Dispatch<React.SetStateAction<Task[]>>;
  updateTask: (id: ObjectId, updates: Partial<Task>) => Promise<void>;
  createTask: (status: Status) => Promise<void>;
  deleteTask: (id: ObjectId) => Promise<void>;
}>({
  items: [],
  setItems: () => {},
  updateTask: async () => {},
  createTask: async () => {},
  deleteTask: async () => {},
});

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const allTasks = await getAllTasks();
        setItems(allTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

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
  const deleteTask = async (id: ObjectId) => {
    try {
      await deleteTaskAPI(id);
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      return;
    } catch (error) {
      console.error("Failed to remove task:", error);
      throw error;
    }
  };
  return (
    <TaskContext.Provider
      value={{ items, setItems, updateTask, createTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
