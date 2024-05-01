import { ComponentProps } from "react";
import ReadMore from "./ReadMore";
import formatEventDate from "@/utils/formatEventDate";
import getVenueLocation from "@/utils/getVenueLocation";

import type { Event } from "@/types";

const DESCRIPTION_MAX_LENGTH = 200;

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
      <header>{formatEventDate(event.datetime)}</header>

      {!!event.description && (
        <section className="EventDetails__Event">
          <ReadMore maxLength={DESCRIPTION_MAX_LENGTH}>
            {event.description}
          </ReadMore>
        </section>
      )}

      <section className="EventDetails__Venue">
        <h4>Venue</h4>
        <p>{event.venue.name}</p>
        <p>{getVenueLocation(event.venue)}</p>
      </section>

      {event.offers.length > 0 && (
        <section className="EventDetails__Offers">
          <h4>Offers</h4>
          {event.offers.map((offer) => (
            <p key={offer.url}>
              {offer.type} - {offer.status} -{" "}
              <a href={offer.url} target="_blank">
                More info
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
          More info
        </a>
      </footer>
    </article>
  );
};

export default EventDetails;
