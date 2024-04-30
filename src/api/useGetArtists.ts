import useSWR from "swr";
import { artistSchema } from "@/schemas";

const useGetArtists = (artistName?: string) => {
  const { data, isLoading, error } = useSWR(
    artistName ? [`/artists/${artistName}`] : undefined
  );

  if (isLoading) {
    return {
      artist: undefined,
      isLoading: true,
      error: undefined,
    };
  }

  if (artistName?.length === 0 || data === "") {
    return {
      artist: undefined,
      isLoading: false,
      error: undefined,
    };
  }

  const validatedData = artistSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      artist: undefined,
      isLoading: false,
      error: "Error while validating the artist data...",
    };
  }

  return {
    artist: validatedData.data,
    isLoading: false,
    error,
  };
};

export default useGetArtists;
