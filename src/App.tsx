import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRoutes";
import type { FC, ReactElement } from "react";

const App: FC = (): ReactElement => {
  return (
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>
  );
};

export default App;
