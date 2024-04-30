import { ComponentProps } from "react";
import LogoSVG from "@/assets/logo.svg?react";

const Header: React.FunctionComponent<ComponentProps<"header">> = ({
  className,
  ...rest
}) => {
  return (
    <header className={`Header ${className}`} {...rest}>
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
