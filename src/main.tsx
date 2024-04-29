import React from "react";
import ReactDOM from "react-dom/client";

import SWRConfigProvider from "@/api/components/SWRConfigProvider.tsx";
import App from "./App.tsx";

import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SWRConfigProvider>
      <App />
    </SWRConfigProvider>
  </React.StrictMode>
);
