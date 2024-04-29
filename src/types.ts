import { z } from "zod";

import { artistSchema, venueSchema, offerSchema, eventSchema } from "./schemas";

export type Artist = z.infer<typeof artistSchema>;
export type Venue = z.infer<typeof venueSchema>;
export type Offer = z.infer<typeof offerSchema>;
export type Event = z.infer<typeof eventSchema>;
