import { baseApi } from "./config";
import { IPaginatedBaseResult } from "./commonTypes";

export interface IUserGoals {
  id: number;
  user_id: number;
  weight_goal: number;
  goal_type: string;
  target_date: string;
}

export interface IPaginatedUserGoals extends IPaginatedBaseResult {
  results: IUserGoals[];
}

export const ApiGetUserGoals = async (): Promise<IPaginatedUserGoals> => {
  const resp = await baseApi("/v1/user_goals/");
  if (!resp) {
    throw Error("No response from 'user_metrics' (get)");
  }
  return await resp.json();
};

export const ApiPostUserGoals = async (data: {
  weight_goal?: number;
  goal_type?: string;
  target_date?: string;
}): Promise<IUserGoals> => {
  const resp = await baseApi("/v1/user_goals/", "POST", data);
  if (!resp) {
    throw Error("No response from 'user_metrics' (post)");
  }
  return await resp.json();
};

export const ApiDeleteUserGoals = async (goalsId: string | number) => {
  const resp = await baseApi(`/v1/user_goals/${goalsId}/`, "DELETE");
  if (!resp) {
    throw Error("No response from 'user_metrics' (delete)");
  }
  //
  // if (resp.status !== 204) {
  //     return await resp.json();
  // }
  //
  // return null;
};
