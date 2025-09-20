"use client";

import { createContext, useState } from "react";
import { tasks } from "../data/sample-data";
import type { Task } from "~/models/task";

export const TaskContext = createContext<{
  items: Task[];
  setItems: React.Dispatch<React.SetStateAction<Task[]>>;
}>({
  items: [],
  setItems: () => {},
});

export function TaskProvider({
  children,
  initialTasks,
}: {
  children: React.ReactNode;
  initialTasks?: Task[];
}) {
  const [items, setItems] = useState<Task[]>(initialTasks ?? []);
  return (
    <TaskContext.Provider value={{ items, setItems }}>
      {children}
    </TaskContext.Provider>
  );
}
