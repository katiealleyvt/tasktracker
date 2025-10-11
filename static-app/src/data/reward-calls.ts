import type { ObjectId } from "mongoose";
import { api_host } from "../App";
import { Reward } from "../models/reward";
import { deleteData, getData, postData } from "./fetchData";

export const updateReward = async (
  id: ObjectId,
  updates: Partial<Reward>,
  token: string
) => {
  return postData(
    `${api_host}/api/rewards/update/${id}`,
    updates,
    "PATCH",
    "update reward"
  );
};
export const createReward = async (updates: Partial<Reward>, token: string) => {
  return postData(
    `${api_host}/api/rewards/post`,
    updates,
    "POST",
    "update reward"
  );
};
export const getAllRewards = async (token: string) => {
  return getData(`${api_host}/api/rewards/getAll`, "get rewards");
};
export const deleteReward = async (id: ObjectId, token: string) => {
  return deleteData(`${api_host}/api/rewards/delete/${id}`, "delete reward");
};
