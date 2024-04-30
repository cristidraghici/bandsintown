import useFavoriteEvents from "@/hooks/useFavoriteEvents";
import formatEventDate from "@/utils/formatEventDate";

const FavoriteEventsList = () => {
  const { favoriteEvents, toggleFavoriteEvent } = useFavoriteEvents();

  if (favoriteEvents.length === 0) {
    return <div>No favorite events</div>;
  }

  return (
    <div>
      {favoriteEvents.map((event) => (
        <article key={event.id} className="FavoriteEvent">
          <p>{formatEventDate(event.event.datetime)}</p>
          <p>{event.event.description}</p>
          <p>{event.artist.name}</p>
          <p>{event.event.venue.name}</p>
          <p>{event.event.venue.city}</p>
          <p>{event.event.venue.region}</p>
          <p>{event.event.venue.country}</p>

          <div className="FavoriteEvent__Action">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavoriteEvent(event.id, null, null);
              }}
            >
              Remove from favorites
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default FavoriteEventsList;
