import { ComponentProps } from "react";
import formatEventDate from "@/utils/formatEventDate";
import getVenueLocation from "@/utils/getVenueLocation";

import type { Event } from "@/types";

interface ArtistEventProps extends ComponentProps<"article"> {
  event: Event;
}

const EventDetails: React.FunctionComponent<ArtistEventProps> = ({
  event,
  className,
  ...rest
}) => {
  return (
    <article className={`EventDetails ${className}`} {...rest}>
      <header>{event.venue.name}</header>

      <ul>
        <li>{formatEventDate(event.datetime)}</li>
        <li>{getVenueLocation(event.venue)}</li>
      </ul>

      {!!event.description && (
        <section className="EventDetails_Description">
          {event.description}
        </section>
      )}

      {event.offers.length > 0 && (
        <section className="EventDetails_Offers">
          <h4>Offers</h4>
          {event.offers.map((offer) => (
            <p key={offer.url}>
              {offer.type} - {offer.status} -{" "}
              <a href={offer.url} target="_blank">
                See more
              </a>
            </p>
          ))}
        </section>
      )}

      <footer>
        <a
          href={event.url}
          target="_blank"
          onClick={(e) => e.stopPropagation()}
        >
          Event details
        </a>
      </footer>
    </article>
  );
};

export default EventDetails;
