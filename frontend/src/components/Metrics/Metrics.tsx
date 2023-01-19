import { PlusCircleOutlined } from "@ant-design/icons";
import React, { FC, useEffect, useState } from "react";
import "./Metrics.css";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { MetricsForm } from "./components/Forms/MetricsForm";
import { WeightGraph } from "./components/WeightGraph/WeightGraph";
import { ApiGetUserMetrics, IUserMetrics } from "../../api/userMetrics";
import { Loader } from "../Loader/Loader";
import { ApiGetUserGoals, IUserGoals } from "../../api/userGoals";
import { GoalsForm } from "./components/Forms/GoalForm";
import { WaistGraph } from "./components/WaistGraph/WaistGraph";
import { MetricsData } from "./components/MetricsData/MetricsData";

export const Metrics: FC = () => {
  const [metrics, setMetrics] = useState<null | IUserMetrics[]>(null);
  const [goals, setGoals] = useState<null | IUserGoals[]>(null);

  const [weightModalOpen, setWeightModalOpen] = useState(false);
  const [goalModalOpen, setGoalModalOpen] = useState(false);

  const weightModalClose = () => {
    setWeightModalOpen(false);
  };
  const goalModalClose = () => {
    setGoalModalOpen(false);
  };

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
      <aside className="metrics__controls">
        <button
          className="metrics-button-control"
          onClick={() => setWeightModalOpen(true)}
        >
          <PlusCircleOutlined className="metrics-button-control__icon" />
          <span className="metrics-button-control__text">Добавить Вес</span>
        </button>
        <button
          className="metrics-button-control"
          onClick={() => setGoalModalOpen(true)}
        >
          <PlusCircleOutlined className="metrics-button-control__icon" />
          <span className="metrics-button-control__text">Добавить Цель</span>
        </button>
      </aside>

      <article className="metrics__data">
        <MetricsData metrics={metrics} goals={goals} />
      </article>

      <article className="metrics__metrics-graphs">
        <WeightGraph metrics={metrics} goals={goals} />
      </article>

      <article className="metrics__waist-graphs">
        <WaistGraph metrics={metrics} />
      </article>

      <ModalWrapper
        opened={weightModalOpen}
        onCancel={weightModalClose}
        title="Добавить вес"
      >
        <MetricsForm closeModal={weightModalClose} setMetrics={setMetrics} />
      </ModalWrapper>

      <ModalWrapper
        opened={goalModalOpen}
        onCancel={goalModalClose}
        title="Добавить цель"
      >
        <GoalsForm closeModal={goalModalClose} setGoals={setGoals} />
      </ModalWrapper>
    </section>
  );
};
