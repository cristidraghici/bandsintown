import Header from "@/components/atoms/Header";

import Search from "@/components/molecules/Search";
import Artist from "@/components/molecules/Artist";
import SelectedEvent from "@/components/molecules/SelectedEvent";

import FavoriteEventsList from "./components/molecules/FavoriteEventsList";

const App: React.FunctionComponent = () => {
  return (
    <>
      <Header className="container" />

      <main className="Main container">
        <section className="Main__Artist">
          <Search />
          <Artist />
        </section>

        <section className="Main__Event">
          <h3>Selected event information</h3>
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
