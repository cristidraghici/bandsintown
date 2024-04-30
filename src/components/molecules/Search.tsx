import { ComponentProps, useRef, useEffect } from "react";

import useGlobalContext from "@/hooks/useGlobalContext";
import debounce from "@/utils/debounce";

const Search: React.FunctionComponent<ComponentProps<"input">> = ({
  ...rest
}) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const { artistName, setArtistName, setSelectedArtist, setSelectedEvent } =
    useGlobalContext();

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  // Update the search input value when the artist name changes
  useEffect(() => {
    searchRef.current!.value = artistName;
  }, [artistName]);

  const handleSearch = debounce(() => {
    setSelectedArtist(null);
    setSelectedEvent(null);

    setArtistName(searchRef.current?.value || "");
  }, 1000);

  return (
    <input
      className="Search"
      type="search"
      placeholder="Search for an artist"
      ref={searchRef}
      defaultValue={artistName}
      onChange={handleSearch}
      {...rest}
    />
  );
};

export default Search;
