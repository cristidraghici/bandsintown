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

  const { text, className } = isFavorite(selectedEvent.id)
    ? {
        text: "Remove from favorites",
        className: "secondary",
      }
    : {
        text: "Add to favorites",
        className: "primary",
      };

  return (
    <>
      <EventDetails event={selectedEvent} />

      <button
        className={`SelectedEvent_Button ${className}`}
        onClick={handleClick}
      >
        {text}
      </button>
    </>
  );
};
export default SelectedEvent;
