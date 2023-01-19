import { Loading3QuartersOutlined } from "@ant-design/icons";
import "./Loader.css";
import React, { FC } from "react";

export const Loader: FC = () => {
  return (
    <div className="loader">
      <Loading3QuartersOutlined className="loader__icon" />
    </div>
  );
};
