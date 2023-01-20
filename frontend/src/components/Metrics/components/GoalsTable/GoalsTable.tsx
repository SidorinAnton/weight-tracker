import React, { FC } from "react";
import "./GoalsTable.css";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { parseBackendDateToString } from "../../../../utils/time";
import { DeleteOutlined } from "@ant-design/icons";
import { ApiDeleteUserGoals, IUserGoals } from "../../../../api/userGoals";
import { getGlobalGoalWeight } from "../../../../utils/countMetrics";

interface Props {
  goals: IUserGoals[];
  setGoals: React.Dispatch<React.SetStateAction<IUserGoals[] | null>>;
}

interface DataType {
  key: React.Key;
  date: string;
  weight: number;
}

export const GoalsTable: FC<Props> = ({ goals, setGoals }) => {
  const onDelete = async (id: number) => {
    await ApiDeleteUserGoals(id);
    setGoals((prevState) => {
      if (!prevState) {
        return null;
      }
      return prevState?.filter((state) => state.id !== id);
    });
  };

  const localGoalsColumns: ColumnsType<DataType> = [
    {
      title: "Дата",
      dataIndex: "date",
    },
    {
      title: "Вес, кг",
      dataIndex: "weight",
    },
    {
      title: "",
      dataIndex: "delete",
      align: "center",
      render: (value) => (
        <button
          className="goals-table__button"
          title="Удалить"
          onClick={() => onDelete(value)}
        >
          <DeleteOutlined className="goals-table__icon" />
        </button>
      ),
    },
  ];

  const globalGoal = getGlobalGoalWeight(goals);

  const localData: DataType[] = goals
    .filter((goal) => goal.goal_type === "local")
    .map((goal) => {
      return {
        key: goal.id.toString(),
        date: parseBackendDateToString(goal.target_date),
        weight: goal.weight_goal,
        delete: goal.id,
      };
    });

  return (
    <div className="goals-table">
      <div className="goals-table__global">
        <h2 className="goals-table__global-title">
          Глобальная цель: {globalGoal} кг
        </h2>
      </div>

      <div className="goals-table__local">
        <h2 className="goals-table__local-title">Локальные цели</h2>
        <Table
          className="goals-table__local-table"
          columns={localGoalsColumns}
          dataSource={localData}
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
};
