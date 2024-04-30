import useSWR from "swr";
import { eventSchema } from "@/schemas";

import type { Event } from "@/types";

const useGetArtistsEvents = (artistName?: string) => {
  const { data, isLoading, error } = useSWR(
    artistName ? [`/artists/${artistName}/events`] : undefined
  );

  if (isLoading) {
    return {
      events: [] as Event[],
      isLoading: true,
      error: undefined,
    };
  }

  if (artistName?.length === 0 || data === "") {
    return {
      events: [] as Event[],
      isLoading: false,
      error: undefined,
    };
  }

  const validatedData = eventSchema.array().safeParse(data);
  if (!validatedData.success) {
    return {
      events: [] as Event[],
      isLoading: false,
      error: "Error while validating the events data...",
    };
  }

  return {
    events: validatedData.data,
    isLoading: false,
    error,
  };
};

export default useGetArtistsEvents;
