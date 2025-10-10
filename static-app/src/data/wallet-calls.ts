import type { ObjectId } from "mongoose";
import { api_host } from "../App";
import { Wallet } from "../models/wallet";

export const updateWallet = async (updates: Partial<Wallet>) => {
  console.log("updates", updates);
  try {
    const response = await fetch(`${api_host}/api/wallet/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error("Failed to update wallet");
    }
    const updatedWallet = await response.json();
    return updatedWallet;
  } catch (error) {
    console.error("Error updating wallet:", error);
    throw error;
  }
};
