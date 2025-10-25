"use client";

import { createContext, useEffect, useState } from "react";
import type { Reward } from "../models/reward";
import type { ObjectId } from "mongoose";
import {
  getAllRewards,
  createReward as createRewardAPI,
  updateReward as updateRewardAPI,
  deleteReward as deleteRewardAPI,
} from "../data/reward-calls.ts";
import { Task } from "../models/task";
import { useAuth0 } from "@auth0/auth0-react";

export const RewardContext = createContext<{
  items: Reward[];
  isLoading: boolean;
  setItems: React.Dispatch<React.SetStateAction<Reward[]>>;
  updateReward: (id: ObjectId, updates: Partial<Reward>) => Promise<void>;
  createReward: (r: Reward) => Promise<void>;
  deleteReward: (id: ObjectId) => Promise<void>;
}>({
  items: [],
  isLoading: true,
  setItems: () => {},
  updateReward: async () => {},
  createReward: async () => {},
  deleteReward: async () => {},
});

export function RewardProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);
    };
    if (isAuthenticated) getToken();
  }, [isAuthenticated, getAccessTokenSilently]);
  const [items, setItems] = useState<Reward[]>([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const allRewards = await getAllRewards(token);
        setItems(allRewards);
      } catch (error) {
        console.error("Error fetching rewards:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  const updateReward = async (id: ObjectId, updates: Partial<Task>) => {
    try {
      const updatedReward = await updateRewardAPI(id, updates, token);
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
  const createReward = async (reward: Reward) => {
    try {
      const updatedReward = await createRewardAPI(
        {
          name: reward.name,
          cost: reward.cost,
          isArchived: reward.isArchived,
        },
        token
      );
      setItems((prevItems) => [...prevItems, updatedReward]);
      return updatedReward;
    } catch (error) {
      console.error("Failed to create reward:", error);
      throw error;
    }
  };
  const deleteReward = async (id: ObjectId) => {
    try {
      await deleteRewardAPI(id, token);
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      return;
    } catch (error) {
      console.error("Failed to remove task:", error);
      throw error;
    }
  };
  return (
    <RewardContext.Provider
      value={{
        items,
        isLoading,
        setItems,
        createReward,
        updateReward,
        deleteReward,
      }}
    >
      {children}
    </RewardContext.Provider>
  );
}
