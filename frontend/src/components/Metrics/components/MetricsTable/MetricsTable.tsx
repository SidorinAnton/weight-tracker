import React, { FC } from "react";
import "./MetricsTable.css";
import {
  ApiDeleteUserMetrics,
  IUserMetrics,
} from "../../../../api/userMetrics";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { parseBackendDateToString } from "../../../../utils/time";
import { DeleteOutlined } from "@ant-design/icons";

interface Props {
  metrics: IUserMetrics[];
  setMetrics: React.Dispatch<React.SetStateAction<IUserMetrics[] | null>>;
}

interface DataType {
  key: React.Key;
  date: string;
  weight: number;
  waist: number | null;
}

export const MetricsTable: FC<Props> = ({ metrics, setMetrics }) => {
  const onDelete = async (id: number) => {
    await ApiDeleteUserMetrics(id);
    setMetrics((prevState) => {
      if (!prevState) {
        return null;
      }
      return prevState?.filter((state) => state.id !== id);
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Дата",
      dataIndex: "date",
    },
    {
      title: "Вес, кг",
      dataIndex: "weight",
    },
    {
      title: "Талия, см",
      dataIndex: "waist",
    },
    {
      title: "",
      dataIndex: "delete",
      align: "center",
      render: (value) => (
        <button
          className="metrics-table__button"
          title="Удалить"
          onClick={() => onDelete(value)}
        >
          <DeleteOutlined className="metrics-table__icon" />
        </button>
      ),
    },
  ];

  const data: DataType[] = metrics.map((metric) => {
    return {
      key: metric.id.toString(),
      date: parseBackendDateToString(metric.measurement_date),
      weight: metric.weight,
      waist: metric.waist_circumference,
      delete: metric.id,
    };
  });

  return (
    <Table
      className="metrics-table"
      columns={columns}
      dataSource={data}
      pagination={false}
      bordered
    />
  );
};
