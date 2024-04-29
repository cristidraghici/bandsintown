import { z } from "zod";

export const artistSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  image_url: z.string(),
  thumb_url: z.string(),
  facebook_page_url: z.string(),
  mbid: z.string(),
  tracker_count: z.number(),
  upcoming_event_count: z.number(),
});

export const venueSchema = z.object({
  name: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  city: z.string(),
  region: z.string(),
  country: z.string(),
});

export const offerSchema = z.object({
  type: z.string(),
  url: z.string(),
  status: z.string(),
});

export const eventSchema = z.object({
  id: z.string(),
  artist_id: z.string(),
  url: z.string(),
  on_sale_datetime: z.string(),
  datetime: z.string(),
  description: z.string(),
  venue: z.array(venueSchema),
  offers: z.array(offerSchema),
  lineup: z.array(z.string()),
});
