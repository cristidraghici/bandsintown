import useSWR from "swr";
import fetcher from "./utils/fetcher";

const useGetArtists = (artistName: string) => {
  const { data, isLoading, error } = useSWR(
    artistName ? `/artists/${artistName}` : undefined,
    fetcher
  );

  if (artistName.length === 0 || data === "") {
    return {
      artists: [],
      isLoading: false,
      error: undefined,
    };
  }

  return {
    artists: data,
    isLoading: isLoading || (!error && !data),
    error,
  };
};

export default useGetArtists;
