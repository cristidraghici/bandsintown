import Header from "@/components/Header";
import Search from "@/components/Search";

import Artist from "@/components/Artist";
import SelectedEvent from "@/components/SelectedEvent";

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
          <SelectedEvent />
        </section>

        <section className="Main__Favorites">
          <h3>Favorites</h3>
          <p>No favorites yet</p>
        </section>
      </main>
    </>
  );
};

export default App;
