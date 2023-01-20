import { createContext, useContext } from "react";

interface IContext {
  page: "main" | "table" | "goals";
  setPage: (page: "main" | "table" | "goals") => void;
}

export const PageContext = createContext<IContext>({
  page: "main",
  setPage: () => {},
});
export const usePageContext = () => useContext(PageContext);
