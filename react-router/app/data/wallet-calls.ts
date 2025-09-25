import type { ObjectId } from "mongoose";
import type { Wallet } from "~/models/wallet";

const API_HOST = "http://localhost:3000";

export const updateWallet = async (updates: Partial<Wallet>) => {
  try {
    const response = await fetch(`${API_HOST}/api/wallet/update`, {
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
