import React, { FC, useEffect, useState } from "react";
import "./App.css";
import { ApiIsAuthenticated } from "./api/enrypoint";
import { Header } from "./components/Header/Header";
import { Auth } from "./components/Auth/Auth";
import { Metrics } from "./components/Metrics/Metrics";
import { Loader } from "./components/Loader/Loader";
import { PageContext } from "./components/Context/Context";

export const App: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [page, setPage] = useState<"main" | "table" | "goals">("main");

  useEffect(() => {
    ApiIsAuthenticated().then((result) => setIsAuthenticated(result));
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <div className="app">
        <Loader />
      </div>
    );
  }

  return (
    <div className="app">
      <PageContext.Provider value={{ page, setPage }}>
        <Header isAuthenticated={isAuthenticated} logout={logout} />
        <main>
          <div>{!isAuthenticated ? <Auth login={login} /> : <Metrics />}</div>
        </main>
      </PageContext.Provider>
    </div>
  );
};
