import useFavoriteEvents from "@/hooks/useFavoriteEvents";
import useGlobalContext from "@/hooks/useGlobalContext";

const FavoriteEventButton = () => {
  const { isFavorite, toggleFavoriteEvent } = useFavoriteEvents();
  const { selectedEvent, selectedArtist } = useGlobalContext();

  if (!selectedEvent) {
    return null;
  }

  const handleClick = () => {
    toggleFavoriteEvent(selectedEvent.id, selectedEvent, selectedArtist);
  };

  return (
    <button className="FavoriteEventButton" onClick={handleClick}>
      {isFavorite(selectedEvent.id)
        ? "Remove from favorites"
        : "Add to favorites"}
    </button>
  );
};

export default FavoriteEventButton;
