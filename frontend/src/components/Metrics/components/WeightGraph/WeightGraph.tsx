import React, { FC } from "react";
import "./WeightGraph.css";
import ReactApexChart from "react-apexcharts";
import ru from "apexcharts/dist/locales/ru.json";
import { IUserMetrics } from "../../../../api/userMetrics";
import { toTimestamp } from "../../../../utils/time";
import { IUserGoals } from "../../../../api/userGoals";

interface Props {
  metrics: IUserMetrics[];
  goals: IUserGoals[];
}

export const WeightGraph: FC<Props> = ({ metrics, goals }) => {
  const data = metrics.map(({ measurement_date, weight }) => {
    return {
      x: toTimestamp(measurement_date),
      y: weight,
    };
  });
  const globalGoals = goals.filter((goal) => goal.goal_type === "global");
  const localGoals = goals.filter((goal) => goal.goal_type === "local");

  const state = {
    series: [
      {
        name: "Вес",
        data,
      },
    ],
    options: {
      chart: {
        defaultLocale: "ru",
        locales: [ru],
        type: "line",
        id: "weight",
      },
      colors: ["#0bc43d"],
      markers: {
        size: 5,
      },
      annotations: {
        yaxis: globalGoals.map((goal) => {
          return {
            y: goal.weight_goal,
            strokeDashArray: 2,
            borderColor: "#1677ff",
            label: {
              borderColor: "#1677ff",
              style: {
                color: "#fff",
                background: "#1677ff",
              },
              text: `Цель: ${goal.weight_goal} кг`,
            },
          };
        }),
        xaxis: localGoals.map((goal) => {
          return {
            x: toTimestamp(goal.target_date),
            strokeDashArray: 5,
            borderColor: "#ef5b3c",
          };
        }),
        points: localGoals.map((goal) => {
          return {
            x: toTimestamp(goal.target_date),
            y: goal.weight_goal,
            marker: {
              size: 5,
              fillColor: "#edfae9ec",
              strokeColor: "#ef5b3c",
            },
            label: {
              borderColor: "#ef5b3c",
              style: {
                color: "#fff",
                background: "#ef5b3c",
              },
              text: `${goal.weight_goal} кг`,
            },
          };
        }),
      },
      grid: {
        padding: {
          right: 30,
          top: 10,
          left: 20,
        },
      },
      xaxis: {
        type: "datetime",
        hideOverlappingLabels: true,
      },
      yaxis: {
        title: {
          text: "Вес, кг",
          offsetX: -10,
          style: {
            fontSize: "14px",
            fontFamily: "Roboto Mono, monospace",
            fontWeight: 700,
          },
        },
      },
    },
  };

  return (
    <div className="weight-graph">
      <h2 className="weight-graph__title">Динамика изменения веса</h2>
      <div className="weight-graph__wrapper">
        <ReactApexChart
          // @ts-ignore
          options={state.options}
          series={state.series}
          type="line"
          height={370}
        />
      </div>
    </div>
  );
};
