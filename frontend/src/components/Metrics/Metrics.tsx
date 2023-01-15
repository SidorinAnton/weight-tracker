import {
  Loading3QuartersOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import React, { FC, useEffect, useState } from "react";
import "./Metrics.css";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { MetricsForm } from "./components/Forms/MetricsForm";
import { WeightGraph } from "./components/WeightGraph/WeightGraph";
import { ApiGetUserMetrics, IUserMetrics } from "../../api/userMetrics";
import { toTimestamp } from "../../utils/time";

export const Metrics: FC = () => {
  const [metrics, setMetrics] = useState<null | IUserMetrics[]>(null);

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
  }, []);

  if (metrics === null) {
    return (
      <section className="metrics container">
        {/* TODO make Loader component */}
        <div className="container">
          <Loading3QuartersOutlined />
        </div>
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

      <article className="metrics__graphs">
        <WeightGraph
          weights={metrics.map((metric) => metric.weight)}
          measurementDates={metrics.map((metric) =>
            toTimestamp(metric.measurement_date)
          )}
        />
      </article>

      <ModalWrapper
        opened={weightModalOpen}
        onCancel={weightModalClose}
        title="Добавить вес"
      >
        <MetricsForm closeModal={weightModalClose} />
      </ModalWrapper>
      <ModalWrapper
        opened={goalModalOpen}
        onCancel={goalModalClose}
        title="Добавить цель"
      >
        TODO
      </ModalWrapper>
    </section>
  );
};
