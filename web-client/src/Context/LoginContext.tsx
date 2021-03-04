// TODO : fix es-lint issues;
import { createContext, useContext } from 'react';

export type LoginContextData = {
  isLoggedIn: boolean;
  setIsLoggedIn: (i: boolean) => void;
};

export const LoginContext = createContext<LoginContextData>({
  isLoggedIn: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsLoggedIn: () => {},
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useLoginContext = () => useContext(LoginContext);
