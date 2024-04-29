import useSWR from "swr";
import { artistSchema } from "@/schemas";

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

  const validatedData = artistSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      artist: {},
      isLoading: false,
      error: validatedData.error.errors,
    };
  }

  return {
    artist: validatedData.data,
    isLoading: isLoading || (!error && !data),
    error,
  };
};

export default useGetArtists;
