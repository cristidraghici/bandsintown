import useSWR from "swr";

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

  return {
    events: data,
    isLoading: isLoading || (!error && !data),
    error,
  };
};

export default useGetArtistsEvents;
