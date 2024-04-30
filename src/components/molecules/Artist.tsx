import ArtistDetails from "@/components/atoms/ArtistDetails";
import EventDetails from "@/components/atoms/EventDetails";

import useGlobalContext from "@/hooks/useGlobalContext";

import useGetArtists from "@/api/useGetArtists";
import useGetArtistsEvents from "@/api/useGetArtistsEvents";

import type { Artist } from "@/types";

const Artist = () => {
  const { artistName, selectedArtist, handleSelectArtistAndEvent } =
    useGlobalContext();

  const {
    artist,
    isLoading: isLoadingArtist,
    error: errorArtist,
  } = useGetArtists(artistName);

  const {
    events,
    isLoading: isLoadingEvents,
    // error: errorEvents,
  } = useGetArtistsEvents(artist ? artistName : undefined);

  if (isLoadingArtist || isLoadingEvents) {
    return <div>Loading...</div>;
  }

  if (errorArtist) {
    return <div>Error fetching the artist...</div>;
  }

  if (selectedArtist) {
    return <ArtistDetails artist={selectedArtist} />;
  }

  if (!artistName || !artist) {
    return <div></div>;
  }

  return (
    <>
      <ArtistDetails artist={artist} />

      {events.length > 0 &&
        events.map((event) => (
          <EventDetails
            key={event.id}
            event={event}
            isVenueVisible={false}
            isOffersVisible={false}
            onClick={(e) => {
              e.preventDefault();
              handleSelectArtistAndEvent(artist, event);
            }}
          />
        ))}
    </>
  );
};

export default Artist;
