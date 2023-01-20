import React, { FC, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ModalWrapper } from "../../../ModalWrapper/ModalWrapper";
import { MetricsForm } from "../Forms/MetricsForm";
import { GoalsForm } from "../Forms/GoalForm";
import { IUserMetrics } from "../../../../api/userMetrics";
import { IUserGoals } from "../../../../api/userGoals";
import "./MetricButtonControls.css";

interface Props {
  setMetrics: React.Dispatch<React.SetStateAction<IUserMetrics[] | null>>;
  setGoals: React.Dispatch<React.SetStateAction<IUserGoals[] | null>>;
}

export const MetricButtonControls: FC<Props> = ({ setMetrics, setGoals }) => {
  const [weightModalOpen, setWeightModalOpen] = useState(false);
  const [goalModalOpen, setGoalModalOpen] = useState(false);

  const weightModalClose = () => {
    setWeightModalOpen(false);
  };
  const goalModalClose = () => {
    setGoalModalOpen(false);
  };

  return (
    <>
      <div className="metrics-button-control-wrapper">
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
      </div>

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
    </>
  );
};
