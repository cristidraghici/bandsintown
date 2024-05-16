import { useState } from "react";

import {
  loadFavoriteEvents,
  persistFavoriteEvents,
} from "@/utils/localStorageUtils";

import type { Event, FavoriteEvent } from "@/types";

export type EventsState = {
  selectedEvent: Event | null;
  setSelectedEvent: (event: Event | null) => void;

  favoriteEvents: FavoriteEvent[];
  setFavoriteEvents: (favoriteEvents: FavoriteEvent[]) => void;
};

export const initialValues: EventsState = {
  selectedEvent: null,
  setSelectedEvent: () => {},

  favoriteEvents: loadFavoriteEvents(),
  setFavoriteEvents: () => {},
};

const useEvents = ({
  selectedEvent: initialSelectedEvent,
  favoriteEvents: initialFavoriteEvents,
} = initialValues): EventsState => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(
    initialSelectedEvent
  );
  const [favoriteEvents, setFavoriteEvents] = useState<FavoriteEvent[]>(
    initialFavoriteEvents
  );

  // Persist favorite events to local storage
  const handleSetFavoriteEvents = (favoriteEvents: FavoriteEvent[]) => {
    setFavoriteEvents(favoriteEvents);
    persistFavoriteEvents(favoriteEvents); // side effect for saving to localStorage
  };

  return {
    selectedEvent,
    setSelectedEvent,

    favoriteEvents,
    setFavoriteEvents: handleSetFavoriteEvents,
  };
};

export default useEvents;
