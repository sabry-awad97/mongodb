import "styles/app.module.scss";
import React from "react";
import { Provider } from "react-redux";

import AppRoutes from "./router";
import { store } from "./redux";

const App: React.FC = () => {
  return (
    <div style={{ maxWidth: "100vw", padding: "0 10vw" }}>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </div>
  );
};

export default App;
