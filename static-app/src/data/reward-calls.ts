import type { ObjectId } from "mongoose";
import { api_host } from "../App";
import { Reward } from "../models/reward";
import { getData, postData } from "./fetchData";

export const updateReward = async (id: ObjectId, updates: Partial<Reward>, token: string) => {
      return postData(`${api_host}/api/rewards/update/${id}`, updates, "PATCH", token, "update reward");
  
  
};
export const createReward = async (updates: Partial<Reward>, token: string) => {
      return postData(`${api_host}/api/rewards/post`, updates, token, "POST", "update reward");

  
};
export const getAllRewards = async (token: string) => {
      return getData(`${api_host}/api/rewards/getAll`, "GET", token, "get rewards");

  
};
export const deleteReward = async (id: ObjectId, token: string) => {
        return getData(`${api_host}/api/rewards/delete/${id}`, "DELETE", token, "delete reward");

};
