import useSWR from "swr";

const useGetArtists = (artistName?: string) => {
  const { data, isLoading, error } = useSWR([
    artistName ? `/artists/${artistName}` : undefined,
  ]);

  if (artistName?.length === 0 || data === "") {
    return {
      artist: {},
      isLoading: false,
      error: undefined,
    };
  }
  return {
    artist: data,
    isLoading: isLoading || (!error && !data),
    error,
  };
};

export default useGetArtists;
