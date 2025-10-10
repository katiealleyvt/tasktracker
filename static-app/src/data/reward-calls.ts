import type { ObjectId } from "mongoose";
import { api_host } from "../App";
import { Reward } from "../models/reward";

export const updateReward = async (id: ObjectId, updates: Partial<Reward>) => {
  if (!id) return;
  console.log("updates", updates);
  try {
    const response = await fetch(`${api_host}/api/rewards/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error("Failed to update reward");
    }
    const updatedReward = await response.json();
    return updatedReward;
  } catch (error) {
    console.error("Error updating reward:", error);
    throw error;
  }
};
export const createReward = async (updates: Partial<Reward>) => {
  try {
    const response = await fetch(`${api_host}/api/rewards/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error("Failed to update reward");
    }
    const updatedReward = await response.json();
    return updatedReward;
  } catch (error) {
    console.error("Error updating reward:", error);
    throw error;
  }
};
export const getAllRewards = async () => {
  try {
    const response = await fetch(`${api_host}/api/rewards/getAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get rewards");
    }
    const rewards = await response.json();
    return rewards;
  } catch (error) {
    console.error("Error getting rewards:", error);
    throw error;
  }
};
export const deleteReward = async (id: ObjectId) => {
  try {
    const response = await fetch(`${api_host}/api/rewards/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete reward");
    }
    return;
  } catch (error) {
    console.error("Error deleting reward:", error);
    throw error;
  }
};
