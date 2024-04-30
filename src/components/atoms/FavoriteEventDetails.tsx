import { ComponentProps } from "react";
import formatEventDate from "@/utils/formatEventDate";
import getVenueLocation from "@/utils/getVenueLocation";
import type { FavoriteEvent } from "@/types";

interface FavoriteEventDetailsProps extends ComponentProps<"article"> {
  favoriteEvent: FavoriteEvent;
  onRemoveClicked: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const FavoriteEventDetails: React.FunctionComponent<
  FavoriteEventDetailsProps
> = ({ favoriteEvent, className, onRemoveClicked, ...rest }) => {
  return (
    <article className={`FavoriteEventDetails ${className}`} {...rest}>
      <h3>{favoriteEvent.artist.name}</h3>
      <p>{favoriteEvent.event.venue.name}</p>
      <ul>
        <li>{formatEventDate(favoriteEvent.event.datetime)}</li>
        <li>{getVenueLocation(favoriteEvent.event.venue)}</li>
      </ul>

      <div className="FavoriteEventDetails__Action">
        <button className="secondary" onClick={onRemoveClicked}>
          Remove from favorites
        </button>
      </div>
    </article>
  );
};

export default FavoriteEventDetails;
