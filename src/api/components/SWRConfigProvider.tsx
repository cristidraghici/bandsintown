import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

import fetcher from "../utils/fetcher";

const SWRConfigProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
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
      {children}
    </SWRConfig>
  );
};

export default SWRConfigProvider;
