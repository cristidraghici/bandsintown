import EventDetails from "@/components/atoms/EventDetails";

import useGlobalContext from "@/hooks/useGlobalContext";
import useFavoriteEvents from "@/hooks/useFavoriteEvents";

const SelectedEvent: React.FunctionComponent = () => {
  const { selectedEvent, selectedArtist } = useGlobalContext();
  const { isFavorite, toggleFavoriteEvent } = useFavoriteEvents();

  if (!selectedEvent) {
    return <div>No selected event</div>;
  }

  const handleClick = () => {
    toggleFavoriteEvent(selectedEvent.id, selectedEvent, selectedArtist);
  };

  return (
    <>
      <button className="SelectedEventButton" onClick={handleClick}>
        {isFavorite(selectedEvent.id)
          ? "Remove from favorites"
          : "Add to favorites"}
      </button>

      <EventDetails event={selectedEvent} />
    </>
  );
};
export default SelectedEvent;
