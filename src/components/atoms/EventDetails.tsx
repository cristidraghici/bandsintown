import { ComponentProps } from "react";
import ReadMore from "./ReadMore";
import formatEventDate from "@/utils/formatEventDate";
import getVenueLocation from "@/utils/getVenueLocation";

import type { Event } from "@/types";

const DESCRIPTION_MAX_LENGTH = 200;

interface ArtistEventProps extends ComponentProps<"article"> {
  event: Event;

  isSmallTitleVisible?: boolean;
  isDateVisible?: boolean;
  isDescriptionVisible?: boolean;
  isVenueVisible?: boolean;
  isOffersVisible?: boolean;
  isFooterVisible?: boolean;
}

const EventDetails: React.FunctionComponent<ArtistEventProps> = ({
  event,
  className,
  isSmallTitleVisible = false,
  isDateVisible = true,
  isDescriptionVisible = true,
  isVenueVisible = true,
  isOffersVisible = true,
  isFooterVisible = true,
  ...rest
}) => {
  return (
    <article className={`EventDetails ${className}`} {...rest}>
      <section className="EventDetails__Event">
        {isSmallTitleVisible && (
          <p>
            {formatEventDate(event.datetime, "MMMMMM dd, yyyy")} at{" "}
            {event.venue.name}
          </p>
        )}
        {isDateVisible && <p>{formatEventDate(event.datetime)}</p>}
        {isDescriptionVisible && !!event.description && (
          <ReadMore maxLength={DESCRIPTION_MAX_LENGTH}>
            {event.description}
          </ReadMore>
        )}
      </section>

      {isVenueVisible && (
        <section className="EventDetails__Venue">
          <h4>Venue</h4>
          <p>{event.venue.name}</p>
          <p>{getVenueLocation(event.venue)}</p>
        </section>
      )}

      {isOffersVisible && event.offers.length > 0 && (
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

      {isFooterVisible && (
        <footer>
          <a
            href={event.url}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
          >
            More info
          </a>
        </footer>
      )}
    </article>
  );
};

export default EventDetails;
