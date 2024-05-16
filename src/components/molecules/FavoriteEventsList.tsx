import useFavoriteEvents from "@/hooks/useFavoriteEvents";
import useGlobalContext from "@/hooks/useGlobalContext";
import EventSummary from "@/components/atoms/EventSummary";

import scrollToTop from "@/utils/scrollToTop";

const FavoriteEventsList = () => {
  const { favoriteEvents } = useFavoriteEvents();
  const { setArtistName, setSelectedArtist, setSelectedEvent, selectedEvent } =
    useGlobalContext();

  if (favoriteEvents.length === 0) {
    return <div>No favorite events</div>;
  }

  return (
    <div>
      {[...favoriteEvents].reverse().map(({ id, event, artist }) => (
        <EventSummary
          key={id}
          className={
            selectedEvent?.id === event.id ? "EventSummary--selected" : ""
          }
          event={event}
          artist={artist}
          showArtistNameInTitle={true}
          onClick={(e) => {
            e.preventDefault();
            setArtistName("");
            scrollToTop();
            setSelectedArtist(artist);
            setSelectedEvent(event);
          }}
        />
      ))}
    </div>
  );
};

export default FavoriteEventsList;
