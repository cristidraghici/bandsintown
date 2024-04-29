import useSWR from "swr";
import { eventSchema } from "@/schemas";

const useGetArtistsEvents = (artistName?: string) => {
  const { data, isLoading, error } = useSWR([
    artistName ? `/artists/${artistName}/events` : undefined,
  ]);

  if (artistName?.length === 0 || data === "") {
    return {
      events: [],
      isLoading: false,
      error: undefined,
    };
  }

  const validatedData = eventSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      events: [],
      isLoading: false,
      error: validatedData.error.errors,
    };
  }

  return {
    events: validatedData.data,
    isLoading: isLoading || (!error && !data),
    error,
  };
};

export default useGetArtistsEvents;
