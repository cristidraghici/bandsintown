import { ComponentProps, useRef, useEffect } from "react";

import useGlobalContext from "@/hooks/useGlobalContext";
import debounce from "@/utils/debounce";

const Search: React.FunctionComponent<ComponentProps<"input">> = ({
  ...rest
}) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const { artistName, setArtistName } = useGlobalContext();

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const handleSearch = debounce(() => {
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
