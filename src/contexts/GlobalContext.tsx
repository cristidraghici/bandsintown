import { PropsWithChildren, createContext, useState } from "react";

import type { Event } from "@/types";

export type GlobalContextType = {
  artistName: string;
  setArtistName: (artistName: string) => void;

  selectedEvent: Event | null;
  setSelectedEvent: (event: Event | null) => void;
};

const initialValue: GlobalContextType = {
  artistName: "",
  setArtistName: () => {},

  selectedEvent: null,
  setSelectedEvent: () => {},
};

export const GlobalContext = createContext<GlobalContextType>({
  ...initialValue,
});

export const GlobalProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [artistName, setArtistName] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Custom function to set the selected event
  const handleSelectEvent = (event: Event | null) => {
    if (event?.id === selectedEvent?.id) {
      setSelectedEvent(null);
      return;
    }

    setSelectedEvent(event);
  };

  const value = {
    artistName,
    setArtistName,
    selectedEvent,
    setSelectedEvent: handleSelectEvent,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
