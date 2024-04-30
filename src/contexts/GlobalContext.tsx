import { PropsWithChildren, createContext, useState } from "react";

export type GlobalContextType = {
  artistName: string;
  setArtistName: (artistName: string) => void;
};

const initialValue: GlobalContextType = {
  artistName: "",
  setArtistName: () => {},
};

export const GlobalContext = createContext<GlobalContextType>({
  ...initialValue,
});

export const GlobalProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [artistName, setArtistName] = useState<string>("");
  const value = { artistName, setArtistName };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
