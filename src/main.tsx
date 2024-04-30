import React from "react";
import ReactDOM from "react-dom/client";

import SWRConfigProvider from "@/api/components/SWRConfigProvider.tsx";
import GlobalProvider from "@/contexts/GlobalContext.tsx";

import App from "./App.tsx";

import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SWRConfigProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </SWRConfigProvider>
  </React.StrictMode>
);
