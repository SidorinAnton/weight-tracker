import React, { FC } from "react";
import "./MetricsData.css";
import { IUserMetrics } from "../../../../api/userMetrics";
import { IUserGoals } from "../../../../api/userGoals";
import {
  getDiffGlobalGoalAndLastWeight,
  getGlobalGoalWeight,
  getLastWeightMeasurements,
  getNearestLocalGoalWeight,
} from "../../../../utils/countMetrics";

interface Props {
  metrics: IUserMetrics[];
  goals: IUserGoals[];
}

export const MetricsData: FC<Props> = ({ metrics, goals }) => {
  const lastWeightMeasurements = getLastWeightMeasurements(metrics);
  const globalGoalWeight = getGlobalGoalWeight(goals);
  const diffWeight = getDiffGlobalGoalAndLastWeight(metrics, goals);
  const nearestGoalWeight = getNearestLocalGoalWeight(goals);

  return (
    <div className="weight-data">
      <p className="weight-data__left-col">
        Ближайшая цель:{" "}
        <span className="weight-data__value">{nearestGoalWeight}</span> кг
      </p>
      <p className="weight-data__right-col">
        Последнее измерение:{" "}
        <span className="weight-data__value">{lastWeightMeasurements}</span> кг
      </p>
      <p className="weight-data__left-col">
        Идеальный вес:{" "}
        <span className="weight-data__value">{globalGoalWeight}</span> кг
      </p>
      <p className="weight-data__right-col">
        До идеала осталось:{" "}
        <span className="weight-data__value">
          {diffWeight ? diffWeight : ""}
        </span>{" "}
        кг
      </p>
    </div>
  );
};
