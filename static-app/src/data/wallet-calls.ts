import type { ObjectId } from "mongoose";
import { api_host } from "../App";
import { Wallet } from "../models/wallet";
import { postData } from "./fetchData";

export const updateWallet = async (updates: Partial<Wallet>, token: string) => {
  return postData(`${api_host}/api/wallet/update`, updates, "PATCH", token, "update wallet")
  
};
