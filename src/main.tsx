import React from "react";
import ReactDOM from "react-dom/client";
import { SWRConfig } from "swr";

import GlobalProvider from "@/contexts/GlobalContext.tsx";
import fetcher from "@/utils/fetcher";

import App from "./App.tsx";

import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      <SWRConfig
        value={{
          fetcher,
          provider: () => new Map(),
          refreshInterval: 100000,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          dedupingInterval: 10000,
        }}
      >
        <App />
      </SWRConfig>
    </GlobalProvider>
  </React.StrictMode>
);
