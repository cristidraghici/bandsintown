import { ComponentProps } from "react";
import EventSummary from "@/components/atoms/EventSummary";

import useGlobalContext from "@/hooks/useGlobalContext";
import useGetArtistsEvents from "@/hooks/api/useGetArtistsEvents";

import scrollToTop from "@/utils/scrollToTop";

import type { Artist } from "@/types";

interface ArtistEventProps extends ComponentProps<"section"> {
  artist: Artist;
}

const ArtistEvents: React.FunctionComponent<ArtistEventProps> = ({
  artist,
  className = "",
  ...rest
}) => {
  const { setSelectedArtist, setSelectedEvent, selectedEvent } =
    useGlobalContext();

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
    <section className={`ArtistEvents ${className}`} {...rest}>
      {events.length > 0 &&
        events.map((event) => (
          <EventSummary
            key={event.id}
            className={
              selectedEvent?.id === event.id ? "EventSummary--selected" : ""
            }
            event={event}
            artist={artist}
            showDescription={true}
            onClick={(e) => {
              e.preventDefault();
              setSelectedArtist(artist);
              setSelectedEvent(event);

              scrollToTop();
            }}
          />
        ))}
    </section>
  );
};

export default ArtistEvents;
