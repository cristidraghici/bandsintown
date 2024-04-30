import useFavoriteEvents from "@/hooks/useFavoriteEvents";
import useGlobalContext from "@/hooks/useGlobalContext";
import FavoriteEventDetails from "@/components/atoms/FavoriteEventDetails";

const FavoriteEventsList = () => {
  const { favoriteEvents, toggleFavoriteEvent } = useFavoriteEvents();
  const { setArtistName, handleSelectArtistAndEvent } = useGlobalContext();

  if (favoriteEvents.length === 0) {
    return <div>No favorite events</div>;
  }

  return (
    <div>
      {favoriteEvents.map((favoriteEvent) => (
        <FavoriteEventDetails
          key={favoriteEvent.id}
          favoriteEvent={favoriteEvent}
          onClick={(e) => {
            e.preventDefault();
            setArtistName("");
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
