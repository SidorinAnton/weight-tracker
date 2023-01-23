import { baseApi } from "./config";
import { IPaginatedBaseResult } from "./commonTypes";

export interface IUserMetrics {
  id: number;
  measurement_date: string;
  user_id: number;
  waist_circumference: number;
  weight: number;
}

export interface IPaginatedUserMetrics extends IPaginatedBaseResult {
  results: IUserMetrics[];
}

export const ApiGetUserMetrics = async (): Promise<IPaginatedUserMetrics> => {
  const resp = await baseApi("/v1/user_metrics/");
  if (!resp) {
    throw Error("No response from 'user_metrics' (get)");
  }
  return await resp.json();
};

export const ApiPostUserMetrics = async (data: {
  weight?: number;
  waist_circumference?: number;
  measurement_date?: string;
}): Promise<IUserMetrics> => {
  const resp = await baseApi("/v1/user_metrics/", "POST", data);
  if (!resp) {
    throw Error("No response from 'user_metrics' (post)");
  }
  return await resp.json();
};

export const ApiDeleteUserMetrics = async (metricsId: string | number) => {
  const resp = await baseApi(`/v1/user_metrics/${metricsId}/`, "DELETE");
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
