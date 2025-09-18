import { createContext } from "react";
import { tasks } from "../data/sample-data";

export const TaskContext = createContext(tasks)