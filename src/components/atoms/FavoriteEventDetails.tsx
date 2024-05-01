import { ComponentProps } from "react";
import formatEventDate from "@/utils/formatEventDate";
import getVenueLocation from "@/utils/getVenueLocation";
import type { FavoriteEvent } from "@/types";

interface FavoriteEventDetailsProps extends ComponentProps<"article"> {
  favoriteEvent: FavoriteEvent;
}

const FavoriteEventDetails: React.FunctionComponent<
  FavoriteEventDetailsProps
> = ({ favoriteEvent, className, ...rest }) => {
  return (
    <article className={`FavoriteEventDetails ${className}`} {...rest}>
      <p>
        {favoriteEvent.artist.name} at {favoriteEvent.event.venue.name}
      </p>
      <ul>
        <li>{formatEventDate(favoriteEvent.event.datetime)}</li>
        <li>{getVenueLocation(favoriteEvent.event.venue)}</li>
      </ul>
    </article>
  );
};

export default FavoriteEventDetails;
