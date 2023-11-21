import { createContext } from "react";

type AuthContextValue = {
  userId: number;
  setLoggedIn: (userId: number) => void;
  setLoggedOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null)

export default AuthContext