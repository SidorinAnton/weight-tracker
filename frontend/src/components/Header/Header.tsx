import {
  FileDoneOutlined,
  LineChartOutlined,
  LogoutOutlined,
  TableOutlined,
} from "@ant-design/icons";
import React, { FC } from "react";
import "./Header.css";
import { ApiLogout } from "../../api/enrypoint";
import { usePageContext } from "../Context/Context";

interface Props {
  isAuthenticated: boolean | null;
  logout: () => void;
}

export const Header: FC<Props> = ({ isAuthenticated, logout }) => {
  const { setPage } = usePageContext();
  const onLogout = async () => {
    const resp = await ApiLogout();
    if (resp) {
      console.error(resp);
    } else {
      logout();
    }
  };

  return (
    <header className="header">
      <div className="header__wrapper container">
        <h1 className="header__title">Трекер веса</h1>

        {isAuthenticated && (
          <div className="header__pages">
            <button
              className="header__main-page header__button"
              onClick={() => setPage("main")}
            >
              <LineChartOutlined className="header__icon" />
              <span>График</span>
            </button>
            <button
              className="header__table-page header__button"
              onClick={() => setPage("table")}
            >
              <TableOutlined className="header__icon" />
              <span>Таблица</span>
            </button>
            <button
              className="header__table-page header__button"
              onClick={() => setPage("goals")}
            >
              <FileDoneOutlined className="header__icon" />
              <span>Цели</span>
            </button>
          </div>
        )}

        {isAuthenticated && (
          <button
            className="header__logout-button header__button"
            title="Выйти"
            onClick={onLogout}
          >
            <LogoutOutlined className="header__icon" />
          </button>
        )}
      </div>
    </header>
  );
};
