import useGlobalContext from "./useGlobalContext";
import type { Artist, Event, EventId, FavoriteEvent } from "@/types";

const useFavoriteEvents = () => {
  const { favoriteEvents, setFavoriteEvents } = useGlobalContext();

  const isFavorite = (id: EventId) => {
    return favoriteEvents.some((event) => event.id === id);
  };

  const toggleFavoriteEvent = (
    eventId: EventId,
    event: Event | null,
    artist: Artist | null
  ) => {
    if (isFavorite(eventId) || !artist || !event) {
      setFavoriteEvents(favoriteEvents.filter((event) => event.id !== eventId));
      return;
    }

    setFavoriteEvents([
      ...favoriteEvents,
      { id: eventId, artist, event } as FavoriteEvent,
    ]);
  };

  return { favoriteEvents, isFavorite, toggleFavoriteEvent };
};

export default useFavoriteEvents;
