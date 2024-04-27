import LogoSVG from "@/assets/logo.svg?react";

const App: React.FunctionComponent = () => {
  return (
    <>
      <header className="container">
        <LogoSVG width="20" />
        <h1>Who's in town</h1>
      </header>

      <main className="container">
        <p>Find out who's in town and where they are playing.</p>
      </main>
    </>
  );
};

export default App;
