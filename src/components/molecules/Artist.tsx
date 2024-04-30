import ArtistDetails from "@/components/atoms/ArtistDetails";
import ArtistEvents from "./ArtistEvents";

import useGlobalContext from "@/hooks/useGlobalContext";

import useGetArtists from "@/api/useGetArtists";
import type { Artist } from "@/types";

const Artist = () => {
  const { artistName, selectedArtist } = useGlobalContext();

  const {
    artist,
    isLoading: isLoadingArtist,
    error,
  } = useGetArtists(artistName);

  if (isLoadingArtist) {
    return <div>Loading artist...</div>;
  }

  if (error) {
    return <div>Error fetching the artist...</div>;
  }

  const currentArtist = artist || selectedArtist;

  if (!currentArtist) {
    return <div></div>;
  }

  return (
    <>
      <ArtistDetails artist={currentArtist} />
      <ArtistEvents artist={currentArtist} />
    </>
  );
};

export default Artist;
