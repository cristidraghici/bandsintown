import LogoSVG from "@/assets/logo.svg?react";

const Header: React.FunctionComponent = () => {
  return (
    <header className="Header container">
      <section className="Logo">
        <h1 className="Logo__text">Who's in town</h1>
        <LogoSVG className="Logo__img" />
      </section>

      <h2 className="Logo__CallToAction">
        Find out who's in town and where they are playing.
      </h2>
    </header>
  );
};

export default Header;
