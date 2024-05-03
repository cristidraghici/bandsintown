import { ComponentProps } from "react";
import ReadMore from "./ReadMore";

import formatEventDate from "@/utils/formatEventDate";
import getVenueLocation from "@/utils/getVenueLocation";
import type { Artist, Event } from "@/types";

interface EventSummaryProps extends ComponentProps<"article"> {
  event: Event;
  artist: Artist;

  showArtistNameInTitle?: boolean;
  showDescription?: boolean;
}

const DESCRIPTION_MAX_LENGTH = 200;

const EventSummary: React.FunctionComponent<EventSummaryProps> = ({
  artist,
  event,
  className = "",
  showArtistNameInTitle = false,
  showDescription = false,
  ...rest
}) => {
  const title = showArtistNameInTitle
    ? `${artist.name} at ${event.venue.name}`
    : event.venue.name;

  return (
    <article className={`EventSummary ${className}`} {...rest}>
      <header>{title}</header>
      <ul>
        <li>{formatEventDate(event.datetime)}</li>
        <li>{getVenueLocation(event.venue)}</li>
      </ul>
      {showDescription && (
        <ReadMore
          className="EventSummary_Description"
          maxLength={DESCRIPTION_MAX_LENGTH}
        >
          {event.description}
        </ReadMore>
      )}
    </article>
  );
};

export default EventSummary;
