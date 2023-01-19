import React, { FC } from "react";
import "./WaistGraph.css";
import ReactApexChart from "react-apexcharts";
import ru from "apexcharts/dist/locales/ru.json";
import { IUserMetrics } from "../../../../api/userMetrics";
import { toTimestamp } from "../../../../utils/time";

interface Props {
  metrics: IUserMetrics[];
}

export const WaistGraph: FC<Props> = ({ metrics }) => {
  const data = metrics
    .filter(({ waist_circumference }) => waist_circumference)
    .map(({ measurement_date, waist_circumference }) => {
      return {
        x: toTimestamp(measurement_date),
        y: waist_circumference,
      };
    });

  const state = {
    series: [
      {
        name: "Обхват талии",
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
          text: "Обхват талии, см",
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
    <div className="waist-graph">
      <h2 className="waist-graph__title">Динамика изменения обхвата талии</h2>
      <div className="waist-graph__wrapper">
        <ReactApexChart
          // @ts-ignore
          options={state.options}
          series={state.series}
          type="line"
          height={250}
        />
      </div>
    </div>
  );
};
