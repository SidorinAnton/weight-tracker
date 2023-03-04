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

const calculateWeightFromBMI = (height: number = 1.74): any[] => {
  // ниже 18.5	дефицит массы тела
  // 18.5 – 24.9	нормальная масса тела
  // 25.0 – 29.9	избыточная масса тела
  // 30.0 – 34.9	ожирение 1 степени
  // 35.0 – 39.9	ожирение 2 степени
  // 40.0 и выше	ожирение 3 степени

  return [
    {
      y: 0,
      y2: 18.5 * height ** 2,
      fillColor: "rgba(255,0,0,0.3)",
      label: {
        offsetY: 20,
        offsetX: -10,
        style: {
          color: "#000",
          background: "rgba(255,0,0,0.3)",
        },
        text: "Дефицит",
      },
    },
    {
      y: 18.5 * height ** 2,
      y2: 25 * height ** 2,
      fillColor: "rgba(0,255,60,0.3)",
      label: {
        offsetY: 20,
        offsetX: -10,
        style: {
          color: "#000",
          background: "rgba(0,255,60,0.3)",
        },
        text: "Норма",
      },
    },
    {
      y: 25 * height ** 2,
      y2: 30 * height ** 2,
      fillColor: "rgba(254,176,25,0.3)",
      label: {
        offsetY: 20,
        offsetX: -10,
        style: {
          color: "#000",
          background: "rgba(254,176,25,0.3)",
        },
        text: "Избыток",
      },
    },
    {
      y: 30 * height ** 2,
      y2: 35 * height ** 2,
      fillColor: "rgba(252,38,0,0.3)",
      label: {
        offsetY: 20,
        offsetX: -10,
        style: {
          color: "#000",
          background: "rgba(252,38,0,0.3)",
        },
        text: "Ожирение 1",
      },
    },
    {
      y: 35 * height ** 2,
      y2: 40 * height ** 2,
      fillColor: "rgba(255,15,0,0.6)",
      label: {
        offsetY: 20,
        offsetX: -10,
        style: {
          color: "#000",
          background: "rgba(255,15,0,0.6)",
        },
        text: "Ожирение 2",
      },
    },
    {
      y: 40 * height ** 2,
      y2: 500 * height ** 2,
      fillColor: "rgb(255,0,0)",
      label: {
        offsetY: 20,
        offsetX: -10,
        style: {
          color: "#000",
          background: "rgb(255,0,0)",
        },
        text: "Ожирение 3",
      },
    },
  ];
};

export const WeightGraph: FC<Props> = ({ metrics, goals }) => {
  const data = metrics.map(({ measurement_date, weight }) => {
    return {
      x: toTimestamp(measurement_date),
      y: weight,
    };
  });
  const globalGoals = goals.filter((goal) => goal.goal_type === "global");
  const localGoals = goals.filter((goal) => goal.goal_type === "local");

  const yAxisAnnotations: any[] = [];
  yAxisAnnotations.push(
    ...globalGoals.map((goal) => {
      return {
        y: goal.weight_goal,
        strokeDashArray: 0,
        borderColor: "#1677ff",
        label: {
          position: "left",
          offsetX: 80,
          borderColor: "#1677ff",
          style: {
            color: "#fff",
            background: "#1677ff",
          },
          text: `Цель: ${goal.weight_goal} кг`,
        },
      };
    })
  );

  yAxisAnnotations.push(...calculateWeightFromBMI(1.76));

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
        yaxis: yAxisAnnotations,
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
        min: 65,
        max: 115,
        tickAmount: 10,
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
          height={550}
        />
      </div>
    </div>
  );
};
