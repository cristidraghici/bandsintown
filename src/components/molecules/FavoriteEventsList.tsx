import useFavoriteEvents from "@/hooks/useFavoriteEvents";
import useGlobalContext from "@/hooks/useGlobalContext";
import FavoriteEventDetails from "@/components/atoms/FavoriteEventDetails";

import scrollToTop from "@/utils/scrollToTop";

const FavoriteEventsList = () => {
  const { favoriteEvents, toggleFavoriteEvent } = useFavoriteEvents();
  const { setArtistName, handleSelectArtistAndEvent, selectedEvent } =
    useGlobalContext();

  if (favoriteEvents.length === 0) {
    return <div>No favorite events</div>;
  }

  return (
    <div>
      {[...favoriteEvents].reverse().map((favoriteEvent) => (
        <FavoriteEventDetails
          key={favoriteEvent.id}
          className={
            selectedEvent?.id === favoriteEvent.event.id
              ? "FavoriteEventDetails--selected"
              : ""
          }
          favoriteEvent={favoriteEvent}
          onClick={(e) => {
            e.preventDefault();
            setArtistName("");
            scrollToTop();
            handleSelectArtistAndEvent(
              favoriteEvent.artist,
              favoriteEvent.event
            );
          }}
          onRemoveClicked={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavoriteEvent(favoriteEvent.id, null, null);
          }}
        />
      ))}
    </div>
  );
};

export default FavoriteEventsList;
