import { z } from "zod";

import {
  artistSchema,
  venueSchema,
  offerSchema,
  eventIdSchema,
  eventSchema,
  favoriteEventSchema,
} from "./schemas";

export type Artist = z.infer<typeof artistSchema>;
export type Venue = z.infer<typeof venueSchema>;
export type Offer = z.infer<typeof offerSchema>;
export type EventId = z.infer<typeof eventIdSchema>;
export type Event = z.infer<typeof eventSchema>;
export type FavoriteEvent = z.infer<typeof favoriteEventSchema>;
