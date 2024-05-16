import { useState } from "react";

import type { Artist } from "@/types";

export type ArtistsState = {
  artistName: string;
  setArtistName: (artistName: string) => void;

  selectedArtist: Artist | null;
  setSelectedArtist: (artist: Artist | null) => void;
};

export const initialValues: ArtistsState = {
  artistName: "",
  setArtistName: () => null,

  selectedArtist: null,
  setSelectedArtist: () => {},
};

const useArtists = ({
  artistName: initialArtistName,
  selectedArtist: initialSelectedArtist,
} = initialValues): ArtistsState => {
  const [artistName, setArtistName] = useState<string>(initialArtistName);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(
    initialSelectedArtist
  );

  return {
    artistName,
    setArtistName,

    selectedArtist,
    setSelectedArtist,
  };
};

export default useArtists;
