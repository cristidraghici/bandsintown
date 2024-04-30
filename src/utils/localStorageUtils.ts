import { isBefore } from "date-fns";

import { favoriteEventSchema } from "@/schemas";
import type { FavoriteEvent } from "@/types";

export const persistFavoriteEvents = (favoriteEvents: FavoriteEvent[]) => {
  localStorage.setItem("favoriteEvents", JSON.stringify(favoriteEvents));
};

export const loadFavoriteEvents = (): FavoriteEvent[] => {
  const favoriteEvents = localStorage.getItem("favoriteEvents");

  if (!favoriteEvents) {
    return [];
  }
  const validatedFavoriteEvents = favoriteEventSchema
    .array()
    .safeParse(JSON.parse(favoriteEvents));

  if (!validatedFavoriteEvents.success) {
    return [];
  }

  return validatedFavoriteEvents.data.filter((item) => {
    return isBefore(new Date(), new Date(item.event.datetime));
  });
};
