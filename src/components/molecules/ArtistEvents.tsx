import { ComponentProps } from "react";
import EventDetails from "@/components/atoms/EventDetails";

import useGlobalContext from "@/hooks/useGlobalContext";
import useGetArtistsEvents from "@/api/useGetArtistsEvents";

import type { Artist } from "@/types";

interface ArtistEventProps extends ComponentProps<"section"> {
  artist: Artist;
}

const ArtistEvents: React.FunctionComponent<ArtistEventProps> = ({
  artist,
  ...rest
}) => {
  const { handleSelectArtistAndEvent, selectedEvent } = useGlobalContext();

  const {
    events,
    isLoading: isLoadingEvents,
    error,
  } = useGetArtistsEvents(artist.name);

  if (isLoadingEvents) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error fetching the events...</div>;
  }

  return (
    <section {...rest}>
      {events.length > 0 &&
        events.map((event) => (
          <EventDetails
            key={event.id}
            className={
              selectedEvent?.id === event.id ? "EventDetails--selected" : ""
            }
            event={event}
            isSmallTitleVisible={true}
            isDateVisible={false}
            isVenueVisible={false}
            isOffersVisible={false}
            onClick={(e) => {
              e.preventDefault();
              handleSelectArtistAndEvent(artist, event);
            }}
          />
        ))}
    </section>
  );
};

export default ArtistEvents;
