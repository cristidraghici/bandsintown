import Header from "@/components/Header";
import Search from "@/components/Search";

import Artist from "@/components/Artist";
import SelectedEvent from "@/components/SelectedEvent";

import FavoriteEventButton from "@/components/FavoriteEventButton";
import FavoriteEventsList from "./components/FavoriteEventsList";

const App: React.FunctionComponent = () => {
  return (
    <>
      <Header />

      <main className="Main container">
        <section className="Main__Artist">
          <Search />
          <Artist />
        </section>

        <section className="Main__Event">
          <h3>Selected event information</h3>
          <FavoriteEventButton />
          <SelectedEvent />
        </section>

        <section className="Main__Favorites">
          <h3>Favorites</h3>
          <FavoriteEventsList />
        </section>
      </main>
    </>
  );
};

export default App;
