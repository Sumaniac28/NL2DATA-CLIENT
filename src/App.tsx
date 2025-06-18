import { BrowserRouter } from "react-router-dom";
import type { FC, ReactElement } from "react";
import AppContent from "./AppContent";

const App: FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
