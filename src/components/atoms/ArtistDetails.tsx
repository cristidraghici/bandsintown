import { ComponentProps } from "react";
import ImagePreview from "@/components/atoms/ImagePreview";

import type { Artist } from "@/types";

import FacebookSVG from "@/assets/facebook.svg?react";
import WebLinkSVG from "@/assets/web-link.svg?react";

interface ArtistDetailsProps extends ComponentProps<"article"> {
  artist: Artist;
}

const ArtistDetails: React.FunctionComponent<ArtistDetailsProps> = ({
  artist,
  className,
  ...rest
}) => {
  return (
    <article className={`ArtistDetails ${className}`} {...rest}>
      <a
        href={artist.image_url}
        target="_blank"
        className="ArtistDetails__Media"
      >
        <ImagePreview thumbUrl={artist.thumb_url} imageUrl={artist.image_url} />
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
  );
};

export default ArtistDetails;
