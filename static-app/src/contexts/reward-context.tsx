"use client";

import { createContext, useEffect, useState } from "react";
import { rewards } from "../data/sample-data";
import type { Reward } from "./models/reward";
import type { ObjectId } from "mongoose";
import type { Task } from "./models/task";
import {
  getAllRewards,
  createReward as createRewardAPI,
  updateReward as updateRewardAPI,
  deleteReward as deleteRewardAPI,
} from "./data/reward-calls";

export const RewardContext = createContext<{
  items: Reward[];
  setItems: React.Dispatch<React.SetStateAction<Reward[]>>;
  updateReward: (id: ObjectId, updates: Partial<Reward>) => Promise<void>;
  createReward: () => Promise<void>;
  deleteReward: (id: ObjectId) => Promise<void>;
}>({
  items: [],
  setItems: () => {},
  updateReward: async () => {},
  createReward: async () => {},
  deleteReward: async () => {},
});

export function RewardProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Reward[]>([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const allRewards = await getAllRewards();
        setItems(allRewards);
      } catch (error) {
        console.error("Error fetching rewards:", error);
      }
    };
    fetchTasks();
  }, []);

  const updateReward = async (id: ObjectId, updates: Partial<Task>) => {
    try {
      const updatedReward = await updateRewardAPI(id, updates);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, ...updatedReward } : item
        )
      );
      return updatedReward;
    } catch (error) {
      console.error("Failed to update reward:", error);
      throw error;
    }
  };
  const createReward = async () => {
    try {
      const updatedReward = await createRewardAPI({
        name: "",
        cost: 0,
        isArchived: false,
      });
      setItems((prevItems) => [...prevItems, updatedReward]);
      return updatedReward;
    } catch (error) {
      console.error("Failed to create reward:", error);
      throw error;
    }
  };
  const deleteReward = async (id: ObjectId) => {
    try {
      await deleteRewardAPI(id);
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      return;
    } catch (error) {
      console.error("Failed to remove task:", error);
      throw error;
    }
  };
  return (
    <RewardContext.Provider
      value={{ items, setItems, createReward, updateReward, deleteReward }}
    >
      {children}
    </RewardContext.Provider>
  );
}
