import { PropsWithChildren, createContext } from "react";

import useArtists, {
  initialValues as initialValuesArtists,
} from "./hooks/useArtists";

import useEvents, {
  initialValues as initialValuesEvents,
} from "./hooks/useEvents";

import type { ArtistsState } from "./hooks/useArtists";
import type { EventsState } from "./hooks/useEvents";

export const GlobalContext = createContext<ArtistsState & EventsState>({
  ...initialValuesArtists,
  ...initialValuesEvents,
});

export const GlobalProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const value = {
    ...useArtists(),
    ...useEvents(),
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
