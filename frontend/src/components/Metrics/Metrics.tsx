import React, { FC, useEffect, useState } from "react";
import "./Metrics.css";
import { WeightGraph } from "./components/WeightGraph/WeightGraph";
import { ApiGetUserMetrics, IUserMetrics } from "../../api/userMetrics";
import { Loader } from "../Loader/Loader";
import { ApiGetUserGoals, IUserGoals } from "../../api/userGoals";
import { WaistGraph } from "./components/WaistGraph/WaistGraph";
import { MetricsData } from "./components/MetricsData/MetricsData";
import { MetricButtonControls } from "./components/MetricButtonControls/MetricButtonControls";
import { usePageContext } from "../Context/Context";
import { MetricsTable } from "./components/MetricsTable/MetricsTable";
import { GoalsTable } from "./components/GoalsTable/GoalsTable";

export const Metrics: FC = () => {
  const { page } = usePageContext();
  const [metrics, setMetrics] = useState<null | IUserMetrics[]>(null);
  const [goals, setGoals] = useState<null | IUserGoals[]>(null);

  useEffect(() => {
    ApiGetUserMetrics().then((res) => setMetrics(res.results));
    ApiGetUserGoals().then((res) => setGoals(res.results));
  }, []);

  if (metrics === null || goals === null) {
    return (
      <section className="metrics container">
        <Loader />
      </section>
    );
  }

  return (
    <section className="metrics container">
      <article className="metrics__controls">
        <MetricButtonControls setMetrics={setMetrics} setGoals={setGoals} />
      </article>

      {page === "main" && (
        <>
          <article className="metrics__data">
            <MetricsData metrics={metrics} goals={goals} />
          </article>

          <article className="metrics__metrics-graphs">
            <WeightGraph metrics={metrics} goals={goals} />
          </article>

          <article className="metrics__waist-graphs">
            <WaistGraph metrics={metrics} />
          </article>
        </>
      )}

      {page === "table" && (
        <>
          <article className="metrics__data">
            <MetricsData metrics={metrics} goals={goals} />
          </article>
          <article className="metrics__table">
            <MetricsTable metrics={metrics} setMetrics={setMetrics} />
          </article>
        </>
      )}

      {page === "goals" && (
        <article className="">
          <GoalsTable goals={goals} setGoals={setGoals} />
        </article>
      )}
    </section>
  );
};
