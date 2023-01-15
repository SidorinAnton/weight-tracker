import { LogoutOutlined } from "@ant-design/icons";
import React, { FC } from "react";
import "./Header.css";
import { ApiLogout } from "../../api/enrypoint";

interface Props {
  isAuthenticated: boolean | null;
  logout: () => void;
}

export const Header: FC<Props> = ({ isAuthenticated, logout }) => {
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
          <button
            className="header__logout-button"
            title="Выйти"
            onClick={onLogout}
          >
            <LogoutOutlined className="header__logout-icon" />
          </button>
        )}
      </div>
    </header>
  );
};
