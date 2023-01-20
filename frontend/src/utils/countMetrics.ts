import { IUserMetrics } from "../api/userMetrics";
import { IUserGoals } from "../api/userGoals";
import { toTimestamp } from "./time";

export const getGlobalGoalWeight = (
  goals: IUserGoals[]
): number | undefined => {
  const globalGoals = goals.filter((goal) => goal.goal_type === "global");
  return globalGoals[globalGoals.length - 1]?.weight_goal;
};

export const getNearestLocalGoalWeight = (
  goals: IUserGoals[]
): number | undefined => {
  const today = Date.now();
  const localGoals = goals.filter((goal) => goal.goal_type === "local");
  return localGoals.filter((goal) => toTimestamp(goal.target_date) >= today)[0]
    ?.weight_goal;
};

export const getLastWeightMeasurements = (
  metrics: IUserMetrics[]
): number | undefined => {
  return metrics[metrics.length - 1]?.weight;
};

export const getDiffGlobalGoalAndLastWeight = (
  metrics: IUserMetrics[],
  goals: IUserGoals[]
): number | undefined => {
  const lastWeight = getLastWeightMeasurements(metrics);
  const globalWeight = getGlobalGoalWeight(goals);

  if (lastWeight && globalWeight) {
    return lastWeight - globalWeight;
  }
  return;
};
