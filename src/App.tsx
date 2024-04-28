import { useRef, useState } from "react";

import debounce from "@/utils/debounce";
import useGetArtists from "@/api/useGetArtists";
import useGetArtistsEvents from "@/api/useGetArtistsEvents";

import LogoSVG from "@/assets/logo.svg?react";

const App: React.FunctionComponent = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [artistName, setArtistName] = useState<string>("");
  const { artist, isLoading, error } = useGetArtists(artistName);
  const { events } = useGetArtistsEvents(artistName);

  const handleSearch = debounce(() => {
    setArtistName(searchRef.current?.value || "");
  }, 100);

  return (
    <>
      <header className="container">
        <LogoSVG width="20" />
        <h1>Who's in town</h1>
      </header>

      <main className="container">
        <p>Find out who's in town and where they are playing.</p>

        <input
          className="Search"
          type="search"
          placeholder="Search for an artist"
          ref={searchRef}
          onChange={handleSearch}
        />

        {isLoading && <p>Loading...</p>}
        {!isLoading && error && (
          <p>Something went wrong. Please try again later.</p>
        )}
        {!isLoading && !error && artist && (
          <pre>{JSON.stringify(artist, null, 2)}</pre>
        )}

        {events && <pre>{JSON.stringify(events, null, 2)}</pre>}
      </main>
    </>
  );
};

export default App;
