import { PropsWithChildren, createContext, useState } from "react";

import {
  loadFavoriteEvents,
  persistFavoriteEvents,
} from "@/utils/localStorageUtils";

import type { Event, Artist, FavoriteEvent } from "@/types";

export type GlobalContextType = {
  artistName: string;
  setArtistName: (artistName: string) => void;

  selectedEvent: Event | null;
  setSelectedEvent: (event: Event | null) => void;

  selectedArtist: Artist | null;
  setSelectedArtist: (artist: Artist | null) => void;

  handleSelectArtistAndEvent: (
    artist: Artist | null,
    event: Event | null
  ) => void;

  favoriteEvents: FavoriteEvent[];
  setFavoriteEvents: (favoriteEvents: FavoriteEvent[]) => void;
};

const initialValue: GlobalContextType = {
  artistName: "",
  setArtistName: () => {},

  selectedEvent: null,
  setSelectedEvent: () => {},

  selectedArtist: null,
  setSelectedArtist: () => {},

  handleSelectArtistAndEvent: () => {},

  favoriteEvents: [],
  setFavoriteEvents: () => {},
};

export const GlobalContext = createContext<GlobalContextType>({
  ...initialValue,
});

export const GlobalProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [artistName, setArtistName] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [favoriteEvents, setFavoriteEvents] = useState<FavoriteEvent[]>(
    loadFavoriteEvents()
  );

  // Custom function to set the selected event
  const handleSelectArtistAndEvent = (
    artist: Artist | null,
    event: Event | null
  ) => {
    if (event?.id === selectedEvent?.id || !artist) {
      setSelectedEvent(null);
      setSelectedArtist(null);

      return;
    }

    setSelectedEvent(event);
    setSelectedArtist(artist);
  };

  // Persist favorite events to local storage
  const handleSetFavoriteEvents = (favoriteEvents: FavoriteEvent[]) => {
    setFavoriteEvents(favoriteEvents);
    persistFavoriteEvents(favoriteEvents);
  };

  const value = {
    artistName,
    setArtistName,
    selectedEvent,
    setSelectedEvent,
    selectedArtist,
    setSelectedArtist,

    handleSelectArtistAndEvent,

    favoriteEvents,
    setFavoriteEvents: handleSetFavoriteEvents,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
