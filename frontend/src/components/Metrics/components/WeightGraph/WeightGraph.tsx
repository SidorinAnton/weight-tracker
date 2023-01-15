import React, { FC } from "react";
import "./WeightGraph.css";
import ReactApexChart from "react-apexcharts";
import ru from "apexcharts/dist/locales/ru.json";

interface Props {
  weights: number[];
  measurementDates: number[];
}

export const WeightGraph: FC<Props> = ({ weights, measurementDates }) => {
  const state = {
    series: [
      {
        // [x, y]
        // data: [[1324508400000, 34], [1324594800000, 54], [1326236400000, 43]],
        data: [
          { x: 1324508400000, y: 34 },
          { x: 1324594800000, y: 54 },
          { x: 1326236400000, y: 43 },
        ],
      },
      {
        // [x, y]
        // data: [[1324508400000, 34], [1324594800000, 54], [1326236400000, 43]],
        data: [
          { x: 1324508400000, y: 150 },
          { x: 1324594800000, y: 110 },
          { x: 1326236400000, y: 120 },
        ],
      },
    ],
    options: {
      chart: {
        defaultLocale: "ru",
        locales: [ru],
        type: "line",
        id: "weight",
      },
      annotations: {
        yaxis: [
          {
            y: 40,
            borderColor: "#00E396",
            label: {
              borderColor: "#00E396",
              style: {
                color: "#fff",
                background: "#00E396",
              },
              text: "Глобальная цель",
            },
          },
        ],
        xaxis: [
          {
            x: 1325509400000,
            strokeDashArray: 0,
            borderColor: "#775DD0",
            label: {
              borderColor: "#775DD0",
              style: {
                color: "#fff",
                background: "#775DD0",
              },
              text: "X-line",
            },
          },
        ],
        points: [
          {
            x: 1325509400000,
            y: 50,
            marker: {
              size: 8,
              fillColor: "#fff",
              strokeColor: "red",
              radius: 2,
              // cssClass: 'apexcharts-custom-class'
            },
            label: {
              borderColor: "#FF4560",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#FF4560",
              },

              text: "Point Annotation",
            },
          },
        ],
      },
      // dataLabels: {
      //     enabled: false
      // },
      // stroke: {
      //     curve: 'straight'
      // },
      grid: {
        padding: {
          right: 30,
          top: 10,
          left: 20,
        },
      },
      // title: {
      //     text: 'Line with Annotations',
      //     align: 'left'
      // },
      // labels: ..,
      xaxis: {
        // categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
        // type: 'numeric',
        type: "datetime",
      },
    },
  };

  return (
    <div>
      <h2>Динамика изменения веса</h2>
      <div style={{ width: "800px" }}>
        <ReactApexChart
          // @ts-ignore
          options={state.options}
          series={state.series}
          type="line"
          height={450}
        />
      </div>
    </div>
  );
};
