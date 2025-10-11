import type { ObjectId } from "mongoose";
import { api_host } from "../App";
import { Wallet } from "../models/wallet";
import { getData, postData } from "./fetchData";

export const updateWallet = async (updates: Partial<Wallet>, token: string) => {
  return postData(
    `${api_host}/api/wallet/update`,
    updates,
    "PATCH",
    "update wallet"
  );
};
export const getWallet = async () => {
  const data = await getData(`${api_host}/api/wallet/`, "get wallet");
  return data[0];
};
