import useFavoriteEvents from "@/hooks/useFavoriteEvents";
import FavoriteEventDetails from "@/components/atoms/FavoriteEventDetails";

const FavoriteEventsList = () => {
  const { favoriteEvents, toggleFavoriteEvent } = useFavoriteEvents();

  if (favoriteEvents.length === 0) {
    return <div>No favorite events</div>;
  }

  return (
    <div>
      {favoriteEvents.map((event) => (
        <FavoriteEventDetails
          key={event.id}
          favoriteEvent={event}
          onClick={(e) => {
            e.preventDefault();
            toggleFavoriteEvent(event.id, null, null);
          }}
        />
      ))}
    </div>
  );
};

export default FavoriteEventsList;
