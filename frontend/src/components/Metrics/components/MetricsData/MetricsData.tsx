import React, { FC } from "react";
import "./MetricsData.css";
import { IUserMetrics } from "../../../../api/userMetrics";
import { IUserGoals } from "../../../../api/userGoals";
import { toTimestamp } from "../../../../utils/time";

interface Props {
  metrics: IUserMetrics[];
  goals: IUserGoals[];
}
export const MetricsData: FC<Props> = ({ metrics, goals }) => {
  const globalGoals = goals.filter((goal) => goal.goal_type === "global");
  const localGoals = goals.filter((goal) => goal.goal_type === "local");
  const today = Date.now();

  const lastWeightMeasurements = metrics[metrics.length - 1]?.weight;
  const globalGoalWeight = globalGoals[globalGoals.length - 1]?.weight_goal;
  const diffWeight = lastWeightMeasurements - globalGoalWeight;
  const nearestGoalWeight = localGoals.filter(
    (goal) => toTimestamp(goal.target_date) >= today
  )[0];

  return (
    <div className="weight-data">
      <p>
        Ближайшая цель:{" "}
        <span className="weight-data__value">
          {nearestGoalWeight?.weight_goal}
        </span>{" "}
        кг
      </p>
      <p>
        Последнее измерение:{" "}
        <span className="weight-data__value">{lastWeightMeasurements}</span> кг
      </p>
      <p>
        Идеальный вес:{" "}
        <span className="weight-data__value">{globalGoalWeight}</span> кг
      </p>
      <p>
        До идеала осталось:{" "}
        <span className="weight-data__value">
          {diffWeight ? diffWeight : ""}
        </span>{" "}
        кг
      </p>
    </div>
  );
};
