import type { Venue } from "@/types";

const getVenueLocation = (venue: Venue) => {
  return [venue.city, venue.region, venue.country]
    .filter((item) => !!item)
    .join(", ");
};

export default getVenueLocation;
