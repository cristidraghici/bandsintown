import useGlobalContext from "@/hooks/useGlobalContext";

import useGetArtists from "@/api/useGetArtists";
import useGetArtistsEvents from "@/api/useGetArtistsEvents";

import formatEventDate from "@/utils/formatEventDate";

import FacebookSVG from "@/assets/facebook.svg?react";
import WebLinkSVG from "@/assets/weblink.svg?react";

import type { Event } from "@/types";

const Artist = () => {
  const { artistName, setSelectedEvent } = useGlobalContext();
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

  if (!artistName || !artist) {
    return <div></div>;
  }

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <>
      <article className="ArtistDetails">
        <a
          href={artist.image_url}
          target="_blank"
          className="ArtistDetails__Media"
        >
          <img src={artist.thumb_url} alt={artist.name} />
        </a>

        <section className="ArtistDetails__Info">
          <h3>{artist.name}</h3>

          <ul>
            <li>
              <a href={artist.facebook_page_url} target="_blank">
                <FacebookSVG width={20} height={20} />
              </a>
            </li>
            <li>
              <a href={artist.url} target="_blank">
                <WebLinkSVG width={20} height={20} />
              </a>
            </li>
          </ul>
          <p>{artist.upcoming_event_count} upcoming events</p>
        </section>
      </article>

      {events.length > 0 &&
        events.map((event) => (
          <article
            key={event.id}
            className="ArtistEvent"
            onClick={(e) => {
              e.preventDefault();
              handleSelectEvent(event);
            }}
          >
            <p>{formatEventDate(event.datetime)}</p>
            <p>{event.description}</p>
            <p>
              <a
                href={event.url}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
              >
                More info
              </a>
            </p>
          </article>
        ))}
    </>
  );
};

export default Artist;
