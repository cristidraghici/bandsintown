import { ComponentProps } from "react";
import ReadMore from "./ReadMore";
import formatEventDate from "@/utils/formatEventDate";

import type { Event } from "@/types";

const DESCRIPTION_MAX_LENGTH = 200;

interface ArtistEventProps extends ComponentProps<"article"> {
  event: Event;

  isDescriptionVisible?: boolean;
  isVenueVisible?: boolean;
  isOffersVisible?: boolean;
}

const EventDetails: React.FunctionComponent<ArtistEventProps> = ({
  event,
  className,
  isDescriptionVisible = true,
  isVenueVisible = true,
  isOffersVisible = true,
  ...rest
}) => {
  return (
    <article className={`EventDetails ${className}`} {...rest}>
      <section className="EventDetails__Event">
        <p>{formatEventDate(event.datetime)}</p>
        {isDescriptionVisible && (
          <ReadMore maxLength={DESCRIPTION_MAX_LENGTH}>
            {event.description}
          </ReadMore>
        )}
      </section>

      {isVenueVisible && (
        <section className="EventDetails__Venue">
          <h4>Venue</h4>
          <p>{event.venue.name}</p>
          <p>{event.venue.city}</p>
          <p>{event.venue.region}</p>
          <p>{event.venue.country}</p>
        </section>
      )}

      {isOffersVisible && (
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
  );
};

export default EventDetails;
